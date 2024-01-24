import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoState } from '../redux/reducers/todoReducer';
import { setFilter ,sortBy} from '../redux/actions/todoActions';
import './Navbar.scss'


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
  
    return (
      <>
        Filter : 
        {" "}
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        {" "}
        Sort By : {" "}
        <select value={sortfilter} onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="priority">Priority</option>
        </select>
      </>
    );
};

export default Navbar;
