import { Todo } from "../../redux/reducers/todoReducer";

const apiUrl = 'http://localhost:3000/todos';

// Function to add a new TODO
export async function addTodo(newTodo: Todo): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Failed to add TODO: ${response.statusText}`);
    }

    console.log('TODO added successfully');
  } catch (error : any) {
    console.error('Error adding TODO:', error.message);
  }
}

// Function to delete a TODO by ID
export async function deleteTodo(id: string): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete TODO: ${response.statusText}`);
    }

    console.log('TODO deleted successfully');
  } catch (error : any) {
    console.error('Error deleting TODO:', error.message);
  }
}

// Function to update a TODO by ID
export async function updateTodo(id: string, updatedTodo: Todo): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error(`Failed to update TODO: ${response.statusText}`);
    }

    console.log('TODO updated successfully');
  } catch (error : any) {
    console.error('Error updating TODO:', error.message);
  }
}