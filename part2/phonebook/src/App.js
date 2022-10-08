import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personsService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('Fetching persons data..')
		personsService.getAll().then((initialPersons) => {
			console.log('Fetch success!')
			setPersons(initialPersons)
		})
	}, [])

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}
	const formProps = {
		onSubmit: (event) => {
			event.preventDefault()
			const nameFound = persons.find(
				(person) => person.name.toLowerCase() === newName.toLowerCase().trim()
			)
			if (nameFound) {
				alert(`${newName} is already added to the phonebook`)
				return
			}
			if (newName.trim() && newNumber.trim()) {
				const newPerson = {
					name: newName.trim(),
					number: newNumber.trim(),
				}
				personsService.create(newPerson).then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
			} else alert('Name or number is empty')
		},
		nameInput: {
			value: newName,
			onChange: (event) => {
				setNewName(event.target.value)
			},
		},
		numberInput: {
			value: newNumber,
			onChange: (event) => {
				setNewNumber(event.target.value)
			},
		},
	}
	const deletePerson = (id) => {
		const person = persons.find((person) => person.id === id)
		const deleteConfirmed = window.confirm(`Delete ${person.name} ?`)
		if (deleteConfirmed) {
			personsService.erase(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id))
			})
		}
	}

	const filteredPersons = !filter
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase().trim())
		  )
	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} onChange={handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm formProps={formProps} />
			<h3>Numbers</h3>
			<Persons persons={filteredPersons} handlePersonClick={deletePerson} />
		</div>
	)
}

export default App
