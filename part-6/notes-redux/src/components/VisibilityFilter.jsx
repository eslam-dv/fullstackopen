import { setFilter } from "../reducers/filterReducer.js";
import { useDispatch } from "react-redux";

const VisibilityFilter = () => {
	const dispatch = useDispatch();

	const handleChange = (filter) => {
		dispatch(setFilter(filter));
	};

	return (
		<>
			<label htmlFor="all">all</label>
			<input
				type="radio"
				id="all"
				name="filter"
				onChange={() => handleChange("ALL")}
			/>

			<label htmlFor="important">important</label>
			<input
				type="radio"
				id="important"
				name="filter"
				onChange={() => handleChange("IMPORTANT")}
			/>

			<label htmlFor="unimportant">unimportant</label>
			<input
				type="radio"
				id="unimportant"
				name="filter"
				onChange={() => handleChange("UNIMPORTANT")}
			/>
		</>
	);
};

export default VisibilityFilter;
