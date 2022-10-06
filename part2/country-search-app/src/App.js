import { useState, useEffect } from 'react'
import axios from 'axios'
import { CountryList } from './components/CountryList'

const App = () => {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')
	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((response) => setCountries(response.data))
	}, [])

	const handleQueryChange = (event) => {
		setQuery(event.target.value)
	}

	const searchedCountries = !query
		? []
		: countries.filter((country) =>
				country.name.common.toLowerCase().includes(query.toLowerCase().trim())
		  )

	return (
		<div>
			Find countries by name{' '}
			<input value={query} onChange={handleQueryChange} />
			<CountryList countries={searchedCountries} />
		</div>
	)
}

export default App
