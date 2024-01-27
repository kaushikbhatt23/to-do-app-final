// Reducer.ts
import * as actionTypes from "../actions/todoActionTypes";
import { v4 as uuidv4 } from "uuid";
import pubsub from "../../pubsub";

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
  loading: boolean;
  error: string | null;
}


const initialState: TodoState = {
  todos:[],
  filter: "all",
  current_card_id: null,
  sortBy: "none",
  loading: true,
  error: null,
  
};


const todoReducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
    case actionTypes.UPDATE_FROM_INDEXEDDB:
      return {
        ...state,todos:action.payload.todos
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
      pubsub.publish('addTodo',{todo:newTodo})
      return updatedAddState;

    case actionTypes.DELETE_TODO:
      const updatedDeleteState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
      pubsub.publish('deleteTodo',{id:action.payload.id})
      return updatedDeleteState;

    case actionTypes.TASK_COMPLETED:
      const updatedCompletedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      const updatedCompleteState = { ...state, todos: updatedCompletedTodos };
      const updatedTodoTask=state.todos.find((todo)=>todo.id===action.payload.id);
      const newUpdatedTodoTask={
        ...updatedTodoTask,
        completed: !updatedTodoTask!.completed,
      }
      pubsub.publish('editTodo',{updatedTodo: newUpdatedTodoTask})
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
      const Todo=state.todos.find((todo)=>todo.id===action.payload.id);
      const updatedTodo={
        ...Todo,
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
      }
      pubsub.publish('editTodo',{updatedTodo: updatedTodo})
      return updatedEditState;

    default:
      return state;
  }
};

export default todoReducer;