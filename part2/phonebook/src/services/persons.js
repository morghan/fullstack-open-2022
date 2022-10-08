import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data)
}

const create = (person) => {
	return axios.post(baseUrl, person).then((response) => response.data)
}

const update = (id, modifiedPerson) => {
	return axios
		.put(`${baseUrl}/${id}`, modifiedPerson)
		.then((response) => response.data)
}

const erase = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

const service = { getAll, create, update, erase }

export default service
