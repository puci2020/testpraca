import axios from 'axios'

const API_URL = '/api/users/'

// REGISTER USER
const register = async (formData) => {
  const response = await axios.post(API_URL, formData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// LOGIN USER
const login = async (formData) => {
  const response = await axios.post(API_URL + 'login', formData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// GET USER PROFILE
// const getUserDetails = async (id, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get(API_URL + id, config)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

//   return response.data
// }

// UPDATE USER PROFILE
const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'profile', userData, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// LOGOUT USER
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  //  getUserDetails,
  updateUserProfile,
}

export default authService