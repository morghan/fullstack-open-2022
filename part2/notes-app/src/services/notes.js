import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'
// then() method returns a Promise
// In our service the fulfilled Promise returns the response.data
const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data)
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
