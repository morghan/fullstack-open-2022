import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'
import personsService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)

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
	const createNotification = (content, type) => {
		let message = { content, type }
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}
	const formProps = {
		onSubmit: (event) => {
			event.preventDefault()
			if (newName.trim() && newNumber.trim()) {
				const personFound = persons.find(
					(person) => person.name.toLowerCase() === newName.toLowerCase().trim()
				)
				if (personFound) {
					const updateConfirm = window.confirm(
						`${newName} is already added to the phonebook, replace old number with a new one?`
					)
					if (updateConfirm) {
						const modifiedPerson = {
							...personFound,
							name: newName.trim(),
							number: newNumber.trim(),
						}
						personsService
							.update(personFound.id, modifiedPerson)
							.then((returnedPerson) => {
								setPersons(
									persons.map((person) =>
										person.id !== personFound.id ? person : returnedPerson
									)
								)
								createNotification(`Updated ${returnedPerson.name}`, 'success')
							})
							.catch((error) => {
								createNotification(error.response.data.error, 'error')
							})
					}
				} else {
					const newPerson = {
						name: newName.trim(),
						number: newNumber.trim(),
					}
					personsService
						.create(newPerson)
						.then((returnedPerson) => {
							setPersons(persons.concat(returnedPerson))
							setNewName('')
							setNewNumber('')
							createNotification(`Added ${returnedPerson.name}`, 'success')
						})
						.catch((error) => {
							createNotification(error.response.data.error, 'error')
						})
				}
			} else {
				alert('Name or number is empty')
			}
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
		const personFound = persons.find((person) => person.id === id)
		const deleteConfirmed = window.confirm(`Delete ${personFound.name} ?`)
		if (deleteConfirmed) {
			personsService
				.erase(id)
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id))
					createNotification(
						`${personFound.name}'s information was deleted`,
						'success'
					)
				})
				.catch((error) => {
					createNotification(
						`${personFound.name}'s information has already been removed from server`,
						'error'
					)
					setPersons(persons.filter((person) => person.id !== personFound.id))
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
			<Notification message={notificationMessage} />
			<Filter value={filter} onChange={handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm formProps={formProps} />
			<h3>Numbers</h3>
			<Persons persons={filteredPersons} handlePersonClick={deletePerson} />
		</div>
	)
}

export default App
