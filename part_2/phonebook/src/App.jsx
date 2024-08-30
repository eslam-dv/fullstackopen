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
			setFilteredPersons(
				data.concat({
					name: "test delete",
					number: "1234",
					id: "10",
				}),
			);
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
			const newPerson = { ...person, number: newNumber };
			update(newPerson.id, newPerson)
				.then((data) => {
					const updated = persons.map((p) =>
						p.id !== newPerson.id ? p : data,
					);
					setPersons(updated);
					setFilteredPersons(updated);
					setMsg({
						msg: `Updated "${newPerson.name}" number`,
					});
					resetMsg();
				})
				.catch((_) => {
					setMsg({
						msg: `Information of "${newPerson.name}" has already been removed from server`,
						type: "error",
					});
					resetMsg();
				});
		} else {
			// if person not exist add new person
			const newPerson = {
				id: String(persons.length + 1),
				name: newName,
				number: newNumber,
			};
			create(newPerson)
				.then((data) => {
					const newArr = persons.concat(data);
					setPersons(newArr);
					setFilteredPersons(newArr);
					setMsg({
						msg: `Added "${newPerson.name}"`,
					});
					resetMsg();
				})
				.catch((_) => {
					setMsg({
						msg: `Failed to add "${newPerson.name}"`,
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
			const newArr = persons.filter((person) => person.id !== p.id);
			remove(p.id)
				.then(() => {
					setPersons(newArr);
					setFilteredPersons(newArr);
					setMsg({
						msg: `Successfully deleted "${p.name}"`,
					});
					resetMsg();
				})
				.catch((_) => {
					setMsg({
						msg: `"${p.name}" does not exist in server`,
						type: "error",
					});
					resetMsg();
				});
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
					<Person key={person.id} person={person} handleDelete={handleDelete} />
				))}
			</div>
		</>
	);
};

export default App;
