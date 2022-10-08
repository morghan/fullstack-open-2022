const Person = ({ person, handlePersonClick }) => (
	<div>
		{person.name} : {person.number}{' '}
		<button onClick={() => handlePersonClick(person.id)}>Delete</button>
	</div>
)

export const Persons = ({ persons, handlePersonClick }) => (
	<div>
		{persons.map((person) => (
			<Person
				key={person.id}
				person={person}
				handlePersonClick={handlePersonClick}
			/>
		))}
	</div>
)
