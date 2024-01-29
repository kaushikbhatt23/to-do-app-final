import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TodoState } from "../redux/reducers/todoReducer";
import { setFilter, sortBy } from "../redux/actions/todoActions";
import "./Navbar.scss";
import { addTodo } from "../redux/actions/todoActions";

const Navbar: React.FC = () => {
  const filter = useSelector((state: TodoState) => state.filter);
  const sortfilter = useSelector((state: TodoState) => state.sortBy);
  const dispatch = useDispatch();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    dispatch(setFilter(selectedFilter));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    dispatch(sortBy(selectedSort));
  };

  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    handleClear();
    setIsModalOpen(false);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completionStatus, setCompletionStatus] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(title, description, priority, completionStatus));
    console.log(title);
    closeModal();
    handleClear();
  };
  const handleClear = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCompletionStatus(false);
  };

  return (
    <>
      <div className="app">
        <nav className="navbar">
          <div className="left-button">
            <button onClick={openModal}>Add Task</button>
          </div>
          <div className="right-buttons">
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
            <select value={sortfilter} onChange={handleSortChange}>
              <option value="none">None</option>
              <option value="name">Name</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </nav>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <h2>Add Task</h2>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
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

export default Navbar;
