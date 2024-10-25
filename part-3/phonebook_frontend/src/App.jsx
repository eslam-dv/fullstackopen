import { useEffect, useState } from "react";

import { create, getAll, remove, update } from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [filter, setFilter] = useState("");
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const emptyMsg = {
		msg: "",
		type: "",
	};
	const [msg, setMsg] = useState(emptyMsg);
	const resetMsg = () => {
		setTimeout(() => setMsg(emptyMsg), 5000);
	};

	useEffect(() => {
		getAll().then((data) => {
			setPersons(data);
			setFilteredPersons(data);
		});
	}, []);

	const handleFilter = (e) => {
		setFilter(e.target.value);
		setFilteredPersons(
			persons.filter((p) =>
				p.name.toLowerCase().includes(filter.toLowerCase()),
			),
		);
	};

	const checkPerson = (name) => {
		const person = persons.find((person) => person.name === name);
		return person;
	};

	// handling adding and updating
	const handleSubmit = (e) => {
		e.preventDefault();
		// if person exist update number
		if (
			checkPerson(newName) &&
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`,
			)
		) {
			const person = checkPerson(newName);
			update(person._id, { ...person, number: newNumber })
				.then((response) => {
					const updated = persons.map((p) =>
						p._id !== person._id ? p : response,
					);
					setPersons(updated);
					setFilteredPersons(updated);
					setMsg({
						msg: `Updated "${newName}" number`,
					});
					resetMsg();
				})
				.catch((err) => {
					setMsg({
						msg: err.response.data.error,
						type: "error",
					});
					resetMsg();
				});
		} else {
			create({ name: newName, number: newNumber })
				.then((response) => {
					setPersons(persons.concat(response));
					setFilteredPersons(persons.concat(response));
					setMsg({
						msg: `Added "${newName}"`,
					});
					resetMsg();
				})
				.catch((err) => {
					setMsg({
						msg: err.response.data.error,
						type: "error",
					});
					resetMsg();
				});
		}
		// reset input data
		setNewName("");
		setNewNumber("");
	};

	const handleDelete = (p) => {
		if (window.confirm(`Delete ${p.name}?`)) {
			try {
				const newArr = persons.filter((person) => person._id !== p._id);
				remove(p._id);
				setPersons(newArr);
				setFilteredPersons(newArr);
				setMsg({
					msg: `Successfully deleted "${p.name}"`,
				});
				resetMsg();
			} catch (err) {
				console.error(err);
				setMsg({
					msg: `"${p.name}" does not exist in server`,
					type: "error",
				});
				resetMsg();
			}
		}
	};

	return (
		<>
			<h1>Phonebook</h1>
			<Notification msg={msg.msg} type={msg.type} />
			<Filter filter={filter} handleFilter={handleFilter} />
			<h2>Add a new</h2>
			<AddPerson
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				handleSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			<div>
				{filteredPersons.map((person) => (
					<Person
						key={person._id}
						person={person}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		</>
	);
};

export default App;
