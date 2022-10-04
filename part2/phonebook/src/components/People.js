const Person = ({ person }) => (
	<div>
		{person.name} : {person.number}
	</div>
)

export const People = ({ people }) => (
	<div>
		{people.map((person) => (
			<Person key={person.id} person={person} />
		))}
	</div>
)
