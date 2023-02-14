import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//  @desc Auth user & get token
//  @route POST /api/users/login
//  @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

const user = await User.findOne({ email })

if (!user) {
  res.status(400)
  throw new Error('Użytkownik nieznaleziony, sprawdź poprawność adresu e-mail i hasła')
}

if(user && (await bcrypt.compare(password, user.password))){
    res.json({
        _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
} else {
    res.status(401)
    throw new Error('Nieprawidłowy e-mail lub hasło')
  }
})
 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' })
}


//  @desc Register new user
//  @route POST /api/users/
//  @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Uzupełnij wszystkie pola')
  }

  if (userExist) {
    res.status(400)
    throw new Error('Użytkownik o podanym e-mail już istnieje')
  }


  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Nieprawidłowy użytkownik')
  }
})



//  @desc Get user profile
//  @route GET /api/users/profile
//  @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('Użytkownik nieznaleziony')
  }

  res.status(201).json(req.user)
})

//  @desc Update user profile
//  @route PUT /api/users/profile
//  @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(401)
    throw new Error('Użytkownik nieznaleziony')
  }
})

export {authUser, registerUser, getUserProfile, updateUserProfile}