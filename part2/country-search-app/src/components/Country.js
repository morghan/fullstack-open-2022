export const Country = ({ country }) => (
	<div>
		<h2>{country.name.common}</h2>
		<p>
			Capital: {country.capital.map((c) => c)} <br />
			Area: {country.area}
		</p>
		<h3>Languages</h3>
		<ul>
			{Object.entries(country.languages).map(([code, lang]) => (
				<li key={code}>{lang}</li>
			))}
		</ul>
		<img src={country.flags.png} alt='N/A' />
	</div>
)
