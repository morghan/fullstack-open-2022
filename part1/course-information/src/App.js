const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => {
	const data = props.data;
	return (
		<>
			<p>
				{data.part1} {data.exercises1}
			</p>
			<p>
				{data.part2} {data.exercises2}
			</p>
			<p>
				{data.part3} {data.exercises3}
			</p>
		</>
	);
};
const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
	const course = {
		name: 'Half Stack application development',
		part1: 'Fundamentals of React',
		exercises1: 10,
		part2: 'Using props to pass data',
		exercises2: 7,
		part3: 'State of a component',
		exercises3: 14,
	};
	const { name, ...courseInfo } = course;
	const total = course.exercises1 + course.exercises2 + course.exercises3;

	return (
		<div>
			<Header course={name} />
			<Content data={courseInfo} />
			<Total total={total} />
		</div>
	);
};

export default App;
