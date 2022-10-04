import { useState } from 'react'

const Person = ({ person }) => (
	<span>
		{person.name}
		<br />
	</span>
)
const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const addPerson = (event) => {
		event.preventDefault()
		const personFound = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		)
		if (personFound) alert(`${newName} is already added to the phonebook`)
		if (newName.trim() && !personFound) {
			const newPerson = {
				name: newName,
			}
			setPersons(persons.concat(newPerson))
			setNewName('')
		}
	}
	return (
		<div>
			<h2>Phonebook</h2>
			<div>debug: {newName}</div>
			<form onSubmit={addPerson}>
				<div>
					name:{' '}
					<input
						value={newName}
						onChange={handleNameChange}
						placeholder='add Person name'
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<Person key={person.name} person={person} />
			))}
		</div>
	)
}

export default App
