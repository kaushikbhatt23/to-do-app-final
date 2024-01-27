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

export const deleteTodo = (id: string) => ({
  type: actionTypes.DELETE_TODO,
  payload: {
    id,
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

export const setCurrentCard = (id: string | null) => ({
  type: actionTypes.SET_CURRENT_TODO,
  payload: { id },
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
  payload: { todos},
});

