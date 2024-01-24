import React, { useEffect, useState } from "react";
import "./Form.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import { TodoState } from "../redux/reducers/todoReducer";
import { setCurrentCard, editTodo } from "../redux/actions/dist/todoActions";

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const currentCard = useSelector((state: TodoState) =>
    state.current_card_id
      ? state.todos.find((todo) => todo.id === state.current_card_id) || null
      : null
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completionStatus, setCompletionStatus] = useState(false);

  const handleSubmit = () => {
    if (!currentCard)
      dispatch(addTodo(title, description, priority, completionStatus));
    else dispatch(editTodo(currentCard.id, title, description, priority));

    handleClear();
  };

  const handleClear = () => {
    dispatch(setCurrentCard(null));
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCompletionStatus(false);
  };

  useEffect(() => {
    if (currentCard) {
      setTitle(currentCard.title);
      setDescription(currentCard.description);
      setPriority(currentCard.priority);
      setCompletionStatus(currentCard.completed);
    }
  }, [currentCard]);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <br />
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />

      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <br />

      <button type="submit">Add Task</button>
      <button onClick={handleClear}>Clear</button>
    </form>
  );
};

export default Form;
