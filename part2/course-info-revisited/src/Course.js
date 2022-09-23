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
	return (
		<p>
			<b>Number of exercises {total}</b>
		</p>
	);
};

const Course = ({ course }) => (
	<div>
		<Header courseName={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
);

export default Course;
