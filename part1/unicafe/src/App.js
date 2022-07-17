import { useState } from 'react';

// Destructuring parameters to improve legibility
const Feedback = ({
	handlers: { good: feedGood, neutral: feedNeutral, bad: feedBad },
}) => (
	<div>
		<h1>Give feedback</h1>
		<button onClick={feedGood}>Good</button>
		<button onClick={feedNeutral}>Neutral</button>
		<button onClick={feedBad}>Bad</button>
	</div>
);

const Statistics = ({
	data: { good: dataGood, neutral: dataNeutral, bad: dataBad },
}) => (
	<div>
		<h2>Statistics</h2>
		<p>Good {dataGood}</p>
		<p>Neutral {dataNeutral}</p>
		<p>Bad {dataBad}</p>
	</div>
);
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
