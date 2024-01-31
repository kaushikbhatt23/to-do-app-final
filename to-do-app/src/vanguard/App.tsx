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
import {
  revertAddTodoOperation,
  revertDeleteTodoOperation,
  revertEditTodoOperation,
} from "./redux/actions/todoActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./utils/ToastUtils";

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

    const addingTodoFailedSubscription = pubsub.subscribe(
      "addingTodoFailed",
      (topic, id) => {
        showToast("New todo cannot be added");
        dispatch(revertAddTodoOperation(id));
      }
    );

    const deletingTodoFailedSubscription = pubsub.subscribe(
      "deletingTodoFailed",
      (topic, todo) => {
        showToast("Todo deletion failed");
        dispatch(revertDeleteTodoOperation(todo));
      }
    );

    const editingTodoFailedSubscription = pubsub.subscribe(
      "editingTodoFailed",
      (topic, todo) => {
        showToast("Todo update failed");
        dispatch(revertEditTodoOperation(todo));
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
      pubsub.unsubscribe(editingTodoFailedSubscription);
      pubsub.unsubscribe(deletingTodoFailedSubscription);
      pubsub.unsubscribe(addingTodoFailedSubscription);
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
          <ToastContainer />
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
