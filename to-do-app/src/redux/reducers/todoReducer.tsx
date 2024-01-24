// Reducer.ts
import * as actionTypes from "../actions/todoActionTypes";
import { v4 as uuidv4 } from "uuid";

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
  current_card_id: string | null;
  sortBy : string;
}

const getInitialState = (): TodoState => {
  const storedTodos = localStorage.getItem("todos");
  return {
    todos: storedTodos ? JSON.parse(storedTodos) : [],
    filter: "all",
    current_card_id: null,
    sortBy: "none",
  };
};

const initialState: TodoState = getInitialState();

const updateLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoReducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
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
      updateLocalStorage(updatedAddState.todos);
      return updatedAddState;

    case actionTypes.DELETE_TODO:
      const updatedDeleteState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
      updateLocalStorage(updatedDeleteState.todos);
      return updatedDeleteState;

    case actionTypes.TASK_COMPLETED:
      const updatedCompletedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      const updatedCompleteState = { ...state, todos: updatedCompletedTodos };
      updateLocalStorage(updatedCompleteState.todos);
      return updatedCompleteState;

    case actionTypes.SET_FILTER:
      return { ...state, filter: action.payload.filter };

    case actionTypes.SORT_BY:
      return { ...state, sortBy: action.payload.sortBy };

    case actionTypes.SET_CURRENT_TODO:
      return { ...state, current_card_id: action.payload.id };

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
      updateLocalStorage(updatedEditState.todos);
      return updatedEditState;

    default:
      return state;
  }
};

export default todoReducer;
