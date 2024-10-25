import { useDispatch } from "react-redux";

import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="filter">filter </label>
      <input
        type="text"
        onChange={(e) => dispatch(setFilter(e.target.value))}
        id="filter"
      />
    </div>
  );
};

export default Filter;
