import axios from 'axios'

const API_URL = '/api/products/'

const addToCart = async (id) => {
  const response = await axios.get(API_URL + id)
  const qty = JSON.parse(localStorage.getItem('qty'))
  // var cartItems = []

  if (response.data) {
    // const cartItems = [
    //   {
    //     _id: response.data._id,
    //     name: response.data.name,
    //     image: response.data.image,
    //     price: response.data.price,
    //     countInStock: response.data.countInStock,
    //     qty,
    //   },
    // ]

    // response.data = {
    //   id: response.data._id,
    //   name: response.data.name,
    //   image: response.data.image,
    //   price: response.data.price,
    //   countInStock: response.data.countInStock,
    //   qty,
    // }

    localStorage.setItem('cart', JSON.stringify(response.data))
  }
  return response.data
}

const cartService = {
  addToCart,
}

export default cartService