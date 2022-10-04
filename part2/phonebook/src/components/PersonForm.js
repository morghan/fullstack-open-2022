export const PersonForm = ({ formProps }) => {
	const { onSubmit, nameInput, numberInput } = formProps
	return (
		<form onSubmit={onSubmit}>
			<div>
				name:{' '}
				<input
					value={nameInput.value}
					onChange={nameInput.onChange}
					placeholder='add name'
				/>
			</div>
			<div>
				number:{' '}
				<input
					value={numberInput.value}
					onChange={numberInput.onChange}
					placeholder='add number'
				/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}
