import { useState } from 'react'

const Person = ({ person }) => (
	<span>
		{person.name} : {person.number}
		<br />
	</span>
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

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
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
			<h2>Numbers</h2>
			{persons.map((person) => (
				<Person key={person.id} person={person} />
			))}
		</div>
	)
}

export default App
