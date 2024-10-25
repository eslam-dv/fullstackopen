import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
