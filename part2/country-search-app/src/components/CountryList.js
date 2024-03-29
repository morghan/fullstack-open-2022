import { useState, useEffect } from 'react'
import { Country } from './Country'

export const CountryList = ({ countries }) => {
	// Used an empty array since when this component is mounted
	// the list of countries is empty
	const [visible, setVisible] = useState([])

	const toggleVisible = (index) => {
		const copy = { ...visible }
		copy[index] = !copy[index]
		setVisible(copy)
	}
	// useEffect hook populates state when list of countries changes
	useEffect(() => {
		if (countries.length === 1) setVisible([true])
		if (countries.length > 0 && countries.length <= 10) {
			setVisible(new Array(countries.length).fill(false))
		}
	}, [countries])

	if (countries.length === 1) {
		return <Country country={countries[0]} />
	}
	if (countries.length > 10) {
		return <div>Too many matches, specify query please</div>
	}
	if (countries.length > 0 && countries.length <= 10) {
		return (
			<div>
				{countries.map((country, index) => (
					<span key={country.cca3}>
						{country.name.common}
						<button onClick={() => toggleVisible(index)}>
							{!visible[index] ? 'Show' : 'Hide'}
						</button>
						<br />
						{!visible[index] ? '' : <Country country={country} />}
					</span>
				))}
			</div>
		)
	}
}
