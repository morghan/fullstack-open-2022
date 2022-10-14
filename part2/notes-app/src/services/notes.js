import axios from 'axios'

// baseUrl can be relative since we are deploying the frontend and backend
// into the same server i.e. same address
// However, a proxy for dev backend address must be added to package.json
const baseUrl = '/api/notes'
// then() method returns a Promise
// In our service the fulfilled Promise returns the response.data
const getAll = () => {
	const nonExisting = {
		id: 10000,
		content: 'This note is not saved to server',
		date: '2019-05-30T17:30:31.098Z',
		important: true,
	}
	return axios
		.get(baseUrl)
		.then((response) => response.data.concat(nonExisting))
}

const create = (newNote) => {
	return axios.post(baseUrl, newNote).then((response) => response.data)
}

const update = (id, newNote) => {
	return axios
		.put(`${baseUrl}/${id}`, newNote)
		.then((response) => response.data)
}

const service = { getAll, create, update }
export default service
