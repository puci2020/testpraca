import axios from 'axios'

const API_URL = '/api/products/'

const productDetails = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const productDetailsService = {
  productDetails,
}

export default productDetailsService