import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { People } from './components/People'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('Fetching persons data..')
		axios.get('http://localhost:3001/persons').then((response) => {
			console.log('🚀 > axios.get > response', response.data)
			setPersons(response.data)
		})
	}, [])
	console.log({ persons })

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
			if (newName && newNumber) {
				const newPerson = {
					name: newName.trim(),
					number: newNumber.trim(),
					id: persons.length + 1,
				}
				setPersons(persons.concat(newPerson))
				setNewName('')
				setNewNumber('')
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
			<People people={filteredPersons} />
		</div>
	)
}

export default App
