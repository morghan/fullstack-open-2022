import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data)
}

const create = (person) => {
	return axios.post(baseUrl, person).then((response) => response.data)
}

const erase = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

const service = { getAll, create, erase }

export default service
