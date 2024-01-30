import pubsub from "../pubsub";
import TodoService from "./db/indexedDb";
import { fetchTodosFromServer, addTodo, deleteTodo, updateTodo } from "./api";

const todoService = TodoService.getInstance();
const apiUrl = "http://localhost:3000/todos";

export const initializeTodosFromIndexedDB = async () => {
  try {
    const todos = await todoService.getAllTodos();

    if (!todos) {
      // Data not found in IndexedDB, fetch from the JSON server
      try {
        const todosFromServer = await fetchTodosFromServer();

        // Store the fetched data in IndexedDB
        todoService.storeDataInIndexedDB(todosFromServer);

        // Publish the fetched data
        pubsub.publish("todosFetched", todosFromServer);
      } catch (error: any) {
        console.error(
          "Error fetching todos from the JSON server:",
          error.message
        );
      }
    } else {
      // Data found in IndexedDB, publish the existing data
      pubsub.publish("todosFetched", todos);
    }
  } catch (error: any) {
    console.error("Error fetching todos from IndexedDB:", error.message);
  }
};

const subscribeToTodoEvents = () => {
  const fetchSubscriptionToken = pubsub.subscribe(
    "fetchTodos",
    async (topic, data) => {
      initializeTodosFromIndexedDB();
    }
  );

  // Subscribe to the 'newTodoAdded' event
  const addSubscriptionToken = pubsub.subscribe(
    "addTodo",
    async (topic, data) => {
      let firstTrySuccessful = false;
      try {
        todoService.addTodo(data.todo); // add to indexeddb
        firstTrySuccessful = true;
      } catch (error: any) {
        pubsub.publish("addingTodoFailed", data.todo.id);
        console.log(error);
      }
      if (firstTrySuccessful) {
        // if successfully added to indexeddb then add to server
        const { error } = await addTodo(data.todo);
        if (error) {
          todoService.deleteTodo(data.todo.id);
          pubsub.publish("addingTodoFailed", data.todo.id);
        } else {
          console.log("Todo added at server successfully");
        }
      }
    }
  );

  // Subscribe to the 'todoDeleted' event
  const deleteSubscriptionToken = pubsub.subscribe(
    "deleteTodo",
    async (topic, data) => {
      let firstTrySuccessful = false;
      try {
        todoService.deleteTodo(data.todo.id);
        firstTrySuccessful = true;
      } catch (error: any) {
        console.log(error.message);
        pubsub.publish("deletingTodoFailed", data.todo);
      }
      if (firstTrySuccessful) {
        // if successfully deleted from indexeddb then delete from server
        const { error } = await deleteTodo(data.todo.id);
        if (error) {
          todoService.addTodo(data.todo);
          pubsub.publish("deletingTodoFailed", data.todo);
        } else {
          console.log("Todo deleted at server successfully");
        }
      }
    }
  );

  // Subscribe to the 'todoEdited' event
  const editSubscriptionToken = pubsub.subscribe(
    "editTodo",
    async (topic, data) => {
      let firstTrySuccessful = false;
      try {
        todoService.editTodo(data.updatedTodo);
        firstTrySuccessful = true;
      } catch (error: any) {
        pubsub.publish("editingTodoFailed", data.previousTodo);
        console.log(error.message);
      }
      if (firstTrySuccessful) {
        const { error } = await updateTodo(
          data.updatedTodo.id,
          data.updatedTodo
        );

        if (error) {
          todoService.editTodo(data.previousTodo);
          pubsub.publish("editingTodoFailed", data.previousTodo);
        } else {
          console.log("Todo updated at server successfully");
        }
      }
    }
  );

  return {
    fetchSubscriptionToken,
    addSubscriptionToken,
    deleteSubscriptionToken,
    editSubscriptionToken,
  };
};

export default subscribeToTodoEvents;
