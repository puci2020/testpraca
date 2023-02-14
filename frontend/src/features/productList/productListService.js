import axios from 'axios'

const API_URL = '/api/products/'

const listProducts = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const productListService = {
  listProducts,
}

export default productListService