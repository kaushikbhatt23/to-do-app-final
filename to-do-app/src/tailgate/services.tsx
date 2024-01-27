import pubsub from "../pubsub";
import IndexedDBService from "./indexedDb/db";
import { addTodo,deleteTodo,updateTodo } from "./api";

const indexedDBService = IndexedDBService.getInstance();
const apiUrl = 'http://localhost:3000/todos';



const subscribeToTodoEvents = () => {


  const fetchSubscriptionToken = pubsub.subscribe('fetchTodos', async (topic, data) => {
    const initializeTodosFromIndexedDB = async () => {
      try {
        const todos = await indexedDBService.getAllTodos();

        if (todos.length === 0) {
          // Data not found in IndexedDB, fetch from the JSON server
          try {
            const response = await fetch(apiUrl);
            const todosFromServer = await response.json();

            // Store the fetched data in IndexedDB
            indexedDBService.storeDataInIndexedDB(todosFromServer);

            // Publish the fetched data
            pubsub.publish('todosFetched', todosFromServer);
          } catch (error  : any) {
            console.error('Error fetching todos from the JSON server:', error.message);
          }
        } else {
          // Data found in IndexedDB, publish the existing data
          pubsub.publish('todosFetched', todos);
        }
      } catch (error : any) {
        console.error('Error fetching todos from IndexedDB:', error.message);
      }
    };

    initializeTodosFromIndexedDB();
  });


    // Subscribe to the 'newTodoAdded' event
    const addSubscriptionToken = pubsub.subscribe('addTodo', (topic, data) => {
      indexedDBService.addTodo(data.todo);
      addTodo(data.todo)
    });
  
    // Subscribe to the 'todoDeleted' event
    const deleteSubscriptionToken = pubsub.subscribe('deleteTodo', (topic, data) => {
      indexedDBService.deleteTodo(data.id);
      deleteTodo(data.id)
    });
  
    // Subscribe to the 'todoEdited' event
    const editSubscriptionToken = pubsub.subscribe('editTodo', (topic, data) => {
      indexedDBService.editTodo(data.updatedTodo);
      updateTodo(data.updatedTodo.id,data.updatedTodo);
    });
  
    // Return an object with all subscription tokens for potential cleanup
    return {
      fetchSubscriptionToken,
      addSubscriptionToken,
      deleteSubscriptionToken,
      editSubscriptionToken,
    };
  };
  
  export default subscribeToTodoEvents;

