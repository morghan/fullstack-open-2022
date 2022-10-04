import { useState } from 'react'

const Filter = ({ value, onChange }) => (
	<div>
		Show names containing: <input value={value} onChange={onChange} />
	</div>
)

const People = ({ people }) => (
	<div>
		{people.map((person) => (
			<Person key={person.id} person={person} />
		))}
	</div>
)

const Person = ({ person }) => (
	<div>
		{person.name} : {person.number}
	</div>
)
const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState({ input: '', filteredPersons: [] })

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleFilterChange = (event) => {
		const filteredPersons = persons.filter((person) =>
			person.name.toLowerCase().includes(event.target.value)
		)
		setFilter({ input: event.target.value, filteredPersons: filteredPersons })
	}

	const addPerson = (event) => {
		event.preventDefault()
		const nameFound = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		)
		if (nameFound) {
			alert(`${newName} is already added to the phonebook`)
			return
		}
		if (newName.trim() && newNumber.trim()) {
			const newPerson = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			}
			setPersons(persons.concat(newPerson))
			setNewName('')
			setNewNumber('')
		} else alert('Name or number is empty')
	}
	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter.input} onChange={handleFilterChange} />
			<h3>Add a new</h3>
			<form onSubmit={addPerson}>
				<div>
					name:{' '}
					<input
						value={newName}
						onChange={handleNameChange}
						placeholder='add name'
					/>
				</div>
				<div>
					number:{' '}
					<input
						value={newNumber}
						onChange={handleNumberChange}
						placeholder='add number'
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h3>Numbers</h3>
			<People people={!filter.input ? persons : filter.filteredPersons} />
		</div>
	)
}

export default App
