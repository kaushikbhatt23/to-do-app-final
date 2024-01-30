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
  const addSubscriptionToken = pubsub.subscribe("addTodo", (topic, data) => {
    todoService.addTodo(data.todo);
    addTodo(data.todo);
  });

  // Subscribe to the 'todoDeleted' event
  const deleteSubscriptionToken = pubsub.subscribe(
    "deleteTodo",
    (topic, data) => {
      todoService.deleteTodo(data.id);
      deleteTodo(data.id);
    }
  );

  // Subscribe to the 'todoEdited' event
  const editSubscriptionToken = pubsub.subscribe("editTodo", (topic, data) => {
    todoService.editTodo(data.updatedTodo);
    updateTodo(data.updatedTodo.id, data.updatedTodo);
  });

  return {
    fetchSubscriptionToken,
    addSubscriptionToken,
    deleteSubscriptionToken,
    editSubscriptionToken,
  };
};

export default subscribeToTodoEvents;
