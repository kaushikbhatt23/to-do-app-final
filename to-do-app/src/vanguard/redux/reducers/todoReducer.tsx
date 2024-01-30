// Reducer.ts
import * as actionTypes from "../actions/todoActionTypes";
import { v4 as uuidv4 } from "uuid";
import pubsub from "../../../pubsub";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  filter: string;
  sortBy: string;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  filter: "all",
  sortBy: "none",
  loading: true,
};

const todoReducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
    case actionTypes.UPDATE_FROM_INDEXEDDB:
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
      };
    case actionTypes.ADD_TODO:
      const newTodo: Todo = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        completed: false,
      };
      const updatedAddState = {
        ...state,
        todos: [...state.todos, newTodo],
      };
      pubsub.publish("addTodo", { todo: newTodo });
      return updatedAddState;

    case actionTypes.DELETE_TODO:
      const updatedDeleteState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.todo.id),
      };
      pubsub.publish("deleteTodo", { todo: action.payload.todo });
      return updatedDeleteState;

    case actionTypes.TASK_COMPLETED:
      const updatedCompletedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      const updatedCompleteState = { ...state, todos: updatedCompletedTodos };
      const currentTodoTask = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      const newUpdatedTodoTask = {
        ...currentTodoTask,
        completed: !currentTodoTask!.completed,
      };
      pubsub.publish("editTodo", {
        updatedTodo: newUpdatedTodoTask,
        previousTodo: currentTodoTask,
      });
      return updatedCompleteState;

    case actionTypes.SET_FILTER:
      return { ...state, filter: action.payload.filter };

    case actionTypes.SORT_BY:
      return { ...state, sortBy: action.payload.sortBy };

    case actionTypes.ADDING_TO_DB_FAILED:
      console.log("Reducer : addition to db failed");
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case actionTypes.DELETION_FROM_DB_FAILED:
      console.log("Reducer : deletion from db failed");
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };

    case actionTypes.EDIT_IN_DB_FAILED:
      console.log("Reducer : update to db failed");
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo
        ),
      };

    case actionTypes.EDIT_TODO:
      const updatedEditState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
              }
            : todo
        ),
      };
      const previousTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      const updatedTodo = {
        ...previousTodo,
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
      };
      pubsub.publish("editTodo", {
        updatedTodo: updatedTodo,
        previousTodo: previousTodo,
      });
      return updatedEditState;

    default:
      return state;
  }
};

export default todoReducer;
