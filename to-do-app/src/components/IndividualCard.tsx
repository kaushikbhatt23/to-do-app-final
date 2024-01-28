// components/Card.tsx
import React, { useState } from "react";
import "./IndividualCard.scss";
import { useDispatch } from "react-redux";
import {
  editTodo,
  deleteTodo,
  taskCompleted,
} from "../redux/actions/todoActions";

interface CardProps {
  id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const IndividualCard: React.FC<CardProps> = ({
  id,
  title,
  description,
  priority,
  completed,
}) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteTodo(id));
  };

  const onCompleted = () => {
    dispatch(taskCompleted(id));
  };

  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTodo(id, editTitle, editDescription, editPriority));
    closeModal();
  };

  return (
    <>
      <div className={`card ${completed ? "completed" : ""}`}>
        <input type="checkbox" checked={completed} onChange={onCompleted} />
        <div className="task-details">
          <h3>{title}</h3>
          <p>{description}</p>
          <span className={`priority ${priority}`}>{priority}</span>
        </div>
        <div className="actions">
          <span onClick={onDelete}>&#128465;</span>
          <span onClick={openModal}>&#9998;</span>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <h2>Edit Task</h2>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              ></textarea>
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button>Add Task</button>
              <button onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualCard;
