import axios from 'axios'

const baseUrl = "https://fullstack-ys5b.onrender.com/"

const getAll = () => {
  return axios.get(`${baseUrl}api/persons`)
}

const create = newObject => {
  return axios.post(`${baseUrl}api/persons`, newObject)
}

const delObject = (id) => {
  return axios.delete(`${baseUrl}api/persons/${id}`)
}

const update = async (id, newObject) => {
  return axios.put(`${baseUrl}api/persons/${id}`, newObject)

}


export default { 
  getAll: getAll, 
  create: create, 
  delObject: delObject,
  update: update

}