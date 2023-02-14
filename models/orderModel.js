import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    orderItems: [
        {
            name: {type: String, require: true},
            qty: {type: Number, require: true},
            image: {type: String, require: true},
            price: {type: Number, require: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'Product',
            },

        }
    ],
    shippingAddress: {
        address: {type: String, require: true },
        city: {type: String, require: true },
        postalCode: {type: String, require: true },
        country: {type: String, require: true },
    },
    paymentMethod: {
       type: String, require: true,
    },
   
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0

    }, 
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        require: true,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        require: true,
        default: false,
    },
    deliveredAt: {
        type: Date
    },
}, {
    timestamps: true
})

const Order = mongoose.model('Orders', orderSchema)

export default Order