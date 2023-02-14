import axios from 'axios'

const API_URL = '/api/orders/'


const addOrder = async (formData) => {
  const response =  await axios.post(API_URL, formData).then(res => res.data._id);

  return response
}

const getById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`).then(res => res.data)

  return response;
}


const getUserOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`).then(res => res.data)

  return response;
}


export {addOrder, getById, getUserOrders};
