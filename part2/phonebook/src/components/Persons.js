const Person = ({ person }) => (
	<div>
		{person.name} : {person.number}
	</div>
)

export const Persons = ({ persons }) => (
	<div>
		{persons.map((person) => (
			<Person key={person.id} person={person} />
		))}
	</div>
)
