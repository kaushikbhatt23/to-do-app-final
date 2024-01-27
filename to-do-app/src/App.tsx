import React ,{ useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import { Cards } from './components/Cards';
import Navbar from './components/Navbar';
import pubsub from './pubsub';
import subscribeToTodoEvents from './tailgate/services';
import {updateFromIndexeddb} from  './redux/actions/todoActions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    const initialFetchSubscription=pubsub.subscribe('todosFetched',(topic,todos)=>{
      dispatch(updateFromIndexeddb(todos));
  })
    const {
      fetchSubscriptionToken,
      addSubscriptionToken,
      deleteSubscriptionToken,
      editSubscriptionToken,
    } = subscribeToTodoEvents();

    pubsub.publish('fetchTodos',{});

    return () => {
      pubsub.unsubscribe(initialFetchSubscription);
      pubsub.unsubscribe(fetchSubscriptionToken);
      pubsub.unsubscribe(addSubscriptionToken);
      pubsub.unsubscribe(deleteSubscriptionToken);
      pubsub.unsubscribe(editSubscriptionToken);
    };
  }, []);
  return (
    <div className="App">
       <Form/>
       <div className='right-container'> 
          <Navbar/>
          <Cards/>
       </div>
    </div>

  );
}

export default App;
