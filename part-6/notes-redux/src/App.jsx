import { useDispatch } from "react-redux";
import { useEffect } from "react";

import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";
import { initializeNotes } from "./reducers/noteReducer.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes())
  }, []);

  return (
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  );
};

export default App;
