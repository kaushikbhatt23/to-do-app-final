import React, { useEffect } from "react";
import "./App.scss";
import { Cards } from "./components/Cards";
import Navbar from "./components/Navbar";
import pubsub from "../pubsub";
import subscribeToTodoEvents from "../tailgate/services";
import { updateFromIndexeddb } from "./redux/actions/todoActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TodoState } from "./redux/reducers/todoReducer";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: TodoState) => state.loading);
  useEffect(() => {
    const initialFetchSubscription = pubsub.subscribe(
      "todosFetched",
      (topic, todos) => {
        dispatch(updateFromIndexeddb(todos));
      }
    );
    const {
      fetchSubscriptionToken,
      addSubscriptionToken,
      deleteSubscriptionToken,
      editSubscriptionToken,
    } = subscribeToTodoEvents();

    pubsub.publish("fetchTodos", {});

    return () => {
      pubsub.unsubscribe(initialFetchSubscription);
      pubsub.unsubscribe(fetchSubscriptionToken);
      pubsub.unsubscribe(addSubscriptionToken);
      pubsub.unsubscribe(deleteSubscriptionToken);
      pubsub.unsubscribe(editSubscriptionToken);
    };
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="App">
          <h1>TODO LIST</h1>
          <Navbar />
          <br />
          <Cards />
        </div>
      )}
    </>
  );
}

export default App;