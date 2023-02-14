import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'Prosze wpisz imię'],
        },
        email: {
          type: String,
          unique: true,
          required: [true, 'Prosze wpisz e-mail'],
        },
        password: {
          type: String,
          required: [true, 'Prosze wpisz hasło'],
        },

    
        isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

const User = mongoose.model('User', userSchema)

export default User

