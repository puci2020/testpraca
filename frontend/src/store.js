import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './features/productList/productListSlice'
import productDetailsReducer from './features/productDetails/productDetailsSlice'
import cartReducer from './features/cart/cartSlice'
import authReducer from './features/auth/authSlice'
import orderReducer from './features/order/orderSlice'

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer
  },
})