import { useState } from 'react'

const Person = ({ person }) => <p>{person.name}</p>
const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const addPerson = (event) => {
		event.preventDefault()
		if (newName) {
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
