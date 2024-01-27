// components/Card.tsx
import React from "react";
import "./IndividualCard.scss";
import { useDispatch} from "react-redux";
import { deleteTodo, taskCompleted , setCurrentCard} from "../redux/actions/todoActions";

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

  const onEdit = () => {
    dispatch(setCurrentCard(id));
  };

  const onCompleted = () => {
    dispatch(taskCompleted(id));
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={`priority ${priority.toLowerCase()}`}>{priority}</div>
      <div className={`status ${completed ? "completed" : "incomplete"}`}>
        {completed ? "Completed" : "Incomplete"}
      </div>
      <br />
      <div className="buttons">
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onCompleted}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default IndividualCard;
