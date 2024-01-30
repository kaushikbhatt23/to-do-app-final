// indexedDBService.ts
import { initializeTodosFromIndexedDB } from "../services";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

class TodoService {
  private static instance: TodoService;

  private dbName = "TodoDB";
  private storeName = "Todos";

  private db: IDBDatabase | null = null;

  private constructor() {
    this.initDatabase();
  }

  public static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  private initDatabase(): void {
    const request = indexedDB.open(this.dbName, 3);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  }

  public async getAllTodos(): Promise<Todo[]> {
    await this.waitForDBInitialization();

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("IndexedDB not initialized."));
      }

      const transaction = this.db!.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = (event) => {
        const todos = (event.target as IDBRequest).result;
        resolve(todos);
      };

      getAllRequest.onerror = () => {
        reject(new Error("Error fetching todos from IndexedDB"));
      };
    });
  }

  public addTodo(todo: Todo): void {
    if (this.db) {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const addRequest = store.add(todo);

      addRequest.onsuccess = () => {
        console.log("Todo added successfully in indexeddb.");
      };

      addRequest.onerror = (event) => {
        console.error("Error adding todo:", (event.target as IDBRequest).error);
        throw (event.target as IDBRequest).error;
      };
    }
  }

  public deleteTodo(todoId: string): void {
    if (this.db) {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const deleteRequest = store.delete(todoId);

      deleteRequest.onsuccess = () => {
        console.log("Todo deleted successfully from indexeddb.");
      };

      deleteRequest.onerror = (event) => {
        console.error(
          "Error deleting todo:",
          (event.target as IDBRequest).error
        );
        throw (event.target as IDBRequest).error;
      };
    }
  }

  public editTodo(updatedTodo: Todo): void {
    if (this.db) {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const editRequest = store.put(updatedTodo);

      editRequest.onsuccess = () => {
        console.log("Todo edited successfully in indexeddb.");
      };

      editRequest.onerror = (event) => {
        console.error(
          "Error editing todo:",
          (event.target as IDBRequest).error
        );
        throw (event.target as IDBRequest).error;
      };
    }
  }

  private async waitForDBInitialization(): Promise<void> {
    return new Promise((resolve) => {
      const checkDBInitialization = () => {
        if (this.db) {
          resolve();
        } else {
          setTimeout(checkDBInitialization, 10);
        }
      };

      checkDBInitialization();
    });
  }

  public storeDataInIndexedDB(data: Todo[]): void {
    if (this.db) {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      data.forEach((todo) => {
        store.put(todo);
      });
    }
  }
}

export default TodoService;
