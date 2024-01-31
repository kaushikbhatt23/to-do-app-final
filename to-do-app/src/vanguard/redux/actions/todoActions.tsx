// Actions.ts
import * as actionTypes from "./todoActionTypes";
import { Todo } from "../reducers/todoReducer";

export const addTodo = (
  title: string,
  description: string,
  priority: string,
  completionStatus: Boolean
) => ({
  type: actionTypes.ADD_TODO,
  payload: {
    title,
    description,
    priority,
    completionStatus,
  },
});

export const deleteTodo = (todo: Todo) => ({
  type: actionTypes.DELETE_TODO,
  payload: {
    todo,
  },
});

export const taskCompleted = (id: string) => ({
  type: actionTypes.TASK_COMPLETED,
  payload: {
    id,
  },
});

export const setFilter = (filter: string) => ({
  type: actionTypes.SET_FILTER,
  payload: { filter },
});

export const editTodo = (
  id: string,
  title: string,
  description: string,
  priority: string
) => ({
  type: actionTypes.EDIT_TODO,
  payload: { id, title, description, priority },
});

export const sortBy = (sortBy: string) => ({
  type: actionTypes.SORT_BY,
  payload: { sortBy },
});

export const updateFromIndexeddb = (todos: Todo[]) => ({
  type: actionTypes.UPDATE_FROM_INDEXEDDB,
  payload: { todos },
});

export const revertAddTodoOperation = (id: string) => ({
  type: actionTypes.ADDING_TO_DB_FAILED,
  payload: { id },
});

export const revertDeleteTodoOperation = (todo: Todo) => ({
  type: actionTypes.DELETION_FROM_DB_FAILED,
  payload: { todo },
});

export const revertEditTodoOperation = (todo: Todo) => ({
  type: actionTypes.EDIT_IN_DB_FAILED,
  payload: { todo },
});
