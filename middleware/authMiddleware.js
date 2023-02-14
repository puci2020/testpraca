import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findById(decoded.id).select('-password')

        next()
      } catch (error) {
        console.log(error)
        throw new Error('Brak autoryzacji')
      }
    }

    if (!token) {
      next();
      // res.status(401)
      // throw new Error('Uwierzytelnianie nieznalezione')
    }
  })

export default protect