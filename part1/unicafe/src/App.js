import { useState } from 'react';

const Button = ({ clickHandler, text }) => (
	<button onClick={clickHandler}>{text}</button>
);

// Destructuring parameters to improve legibility
const Feedback = ({
	handlers: { good: feedGood, neutral: feedNeutral, bad: feedBad },
}) => (
	<div>
		<h1>Give feedback</h1>
		<Button clickHandler={feedGood} text='Good' />
		<Button clickHandler={feedNeutral} text='Neutral' />
		<Button clickHandler={feedBad} text='Bad' />
	</div>
);

const StatisticLine = ({ value, text }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);
const Statistics = ({
	data: { good: dataGood, neutral: dataNeutral, bad: dataBad },
}) => {
	const addData = () => {
		return dataGood + dataNeutral + dataBad;
	};

	// No validations required for total due to conditional rendering
	const average = () => {
		const total = addData();
		return ((dataGood - dataBad) / total).toFixed(2);
	};

	const positivePercentage = () => {
		const total = addData();
		return `${((dataGood / total) * 100).toFixed(2)}%`;
	};

	return (
		<div>
			<h2>Statistics</h2>
			{dataGood || dataNeutral || dataBad ? (
				<table>
					<tbody>
						<StatisticLine value={dataGood} text='Good' />
						<StatisticLine value={dataNeutral} text='Neutral' />
						<StatisticLine value={dataBad} text='Bad' />
						<StatisticLine value={addData()} text='All' />
						<StatisticLine value={average()} text='Average' />
						<StatisticLine value={positivePercentage()} text='Positive' />
					</tbody>
				</table>
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};
const App = () => {
	// State
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	// Handlers
	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	const feedbackHandlers = {
		good: handleGood,
		neutral: handleNeutral,
		bad: handleBad,
	};

	const statisticsData = {
		good: good,
		neutral: neutral,
		bad: bad,
	};

	return (
		<div>
			<Feedback handlers={feedbackHandlers} />
			<Statistics data={statisticsData} />
		</div>
	);
};

export default App;
