import { Country } from './Country'

export const CountryList = ({ countries }) => {
	if (countries.length === 1) {
		return <Country country={countries[0]} />
	}
	if (countries.length > 10) {
		return <div>Too many matches, specify query please</div>
	}
	if (countries.length > 0 && countries.length <= 10) {
		return (
			<div>
				{countries.map((country) => (
					<span key={country.cca3}>
						{country.name.common}
						<br />
					</span>
				))}
			</div>
		)
	}
}
