const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = (props) => (
	<p>
		{props.partName} {props.partExercises}
	</p>
);
const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part partName={part.name} partExercises={part.exercises} key={part.id} />
		))}
	</div>
);
const Total = ({ parts }) => {
	const total = parts.reduce(
		(previous, current) => previous + current.exercises,
		0
	);
	return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => (
	<div>
		<Header courseName={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
);

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2,
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3,
			},
		],
	};

	return <Course course={course} />;
};

export default App;