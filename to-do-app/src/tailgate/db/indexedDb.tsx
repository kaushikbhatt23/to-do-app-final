// indexedDBService.ts
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

  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 3);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = () => {
        console.error("Error opening IndexedDB");
        reject(new Error("Error opening IndexedDB"));
      };
    });
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

  public addTodo(todo: Todo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error("IndexedDB not initialized."));
        return;
      }

      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const addRequest = store.add(todo);

      addRequest.onsuccess = () => {
        console.log("Todo added successfully in IndexedDB.");
        resolve();
      };

      addRequest.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        console.error("Error adding todo:", error);
        reject(error);
      };
    });
  }

  public deleteTodo(todoId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error("IndexedDB not initialized."));
        return;
      }

      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const deleteRequest = store.delete(todoId);

      deleteRequest.onsuccess = () => {
        console.log("Todo deleted successfully from IndexedDB.");
        resolve();
      };

      deleteRequest.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        console.error("Error deleting todo:", error);
        reject(error);
      };
    });
  }

  public editTodo(updatedTodo: Todo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error("IndexedDB not initialized."));
        return;
      }

      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const editRequest = store.put(updatedTodo);

      editRequest.onsuccess = () => {
        console.log("Todo edited successfully in IndexedDB.");
        resolve();
      };

      editRequest.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        console.error("Error editing todo:", error);
        reject(error);
      };
    });
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
