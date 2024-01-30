import { Todo } from "../../vanguard/redux/reducers/todoReducer";

const apiUrl = "http://localhost:3000/todos";

export async function fetchTodosFromServer(): Promise<Todo[]> {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch TODOs: ${response.statusText}`);
    }

    const todos = await response.json();
    console.log("TODOs fetched successfully from the server");
    return todos;
  } catch (error: any) {
    console.error("Error fetching TODOs from the server:", error.message);
    throw error; // Re-throw the error to be caught by the calling function if needed
  }
}

// Function to add a new TODO

export async function addTodo(
  newTodo: Todo
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to add TODO: ${response.statusText}`,
      };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error };
  }
}

// Function to delete a TODO by ID
export async function deleteTodo(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to delete TODO: ${response.statusText}`,
      };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error };
  }
}

// Function to update a TODO by ID
export async function updateTodo(
  id: string,
  updatedTodo: Todo
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to update TODO: ${response.statusText}`,
      };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error };
  }
}
