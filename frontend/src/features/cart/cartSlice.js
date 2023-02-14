import { createSlice } from '@reduxjs/toolkit'
import cartService from './cartService'

// var cartItems = []
const cartItems = JSON.parse(localStorage.getItem('cart'))
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
// const total = JSON.parse(localStorage.getItem('total'))

// const qty = JSON.parse(localStorage.getItem('qty'))

// if (cartItems) {
//   cartItems = {
//     id: cartItems._id,
//     name: cartItems.name,
//     image: cartItems.image,
//     price: cartItems.price,
//     countInStock: cartItems.countInStock,
//     qty,
//   }
// } else {
//   cartItems = null
// }

const initialState = {
  cartItems: cartItems ? cartItems : [],
  shippingAddress: shippingAddress ? shippingAddress : [],
  paymentMethod: paymentMethod ? paymentMethod : [],
  // isLoading: false,
  // isSuccess: false,
  // isError: false,
  // message: '',
}

// export const addToCart = createAsyncThunk(
//   'cart/cartItems',
//   async (id, thunkAPI) => {
//     try {
//       return await cartService.addToCart(id)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   },
// )

// REDUCERS
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // const item = action.payload.product
      // const itemExist = state.cartItems.findIndex((x) => x._id === item._id)
      // if (itemExist >= 0) {
      //   state.cartItems.push(
      //     ...state.cartItems.map((x) => (x._id === itemExist._id ? item : x)),
      //   )
      // } else {
      //   const temp = { ...action.payload.product, qty: action.payload.qty }
      //   state.cartItems.push(temp)
      // }
      // state.totalPrice += action.payload.product.price * action.payload.qty
      // state.totalQuantity += action.payload.qty

      // METHOD 6
      // const itemExist = state.cartItems.find(
      //   (item) => item._id === action.payload._id,
      // )

      // if (itemExist) {
      //   const qtyInx = state.cartItems.findIndex(
      //     (item) => item._id === action.payload._id,
      //   )

      //   state.cartItems[qtyInx].qty = action.payload.qty
      // } else {
      //   const temp = { ...action.payload, qty: action.payload }
      //   state.cartItems.push(temp)
      // }

      // METHOD 5 Working Excellent
      const itemExist = state.cartItems.find(
        (item) => item._id === action.payload._id,
      )

      if (itemExist) {
        const qtyInx = state.cartItems.findIndex(
          (item) => item._id === action.payload._id,
        )

        state.cartItems[qtyInx].qty = action.payload.qty
      } else {
        state.cartItems.push(action.payload)
      }

      // METHOD 4, WORKING
      // const item = action.payload.product
      // const itemExist = state.cartItems.find((x) => x === item)

      // // if (itemExist) {
      // //   const cartExistingItem = {
      // //     ...itemExist,
      // //     qty: action.payload.qty,
      // //   }

      // if (itemExist) {
      //   const obj = {
      //     ...state.cartItems,
      //     cartItems: state.cartItems.map(
      //       (x) => (x._id === itemExist._id ? action.payload : x),
      //       action.payload.qty,
      //     ),
      //   }
      //   state.cartItems.push(obj)
      // } else {
      //   const temp = {
      //     ...state.cartItems,
      //     cartItems: action.payload,
      //     qty: action.payload.qty,
      //   }
      //   state.cartItems.push(temp)
      // }

      // METHOD 3
      // const item = action.payload
      // const existItem = state.cartItems.find((x) => x.id === item.id)

      // if (existItem) {
      //   state.cartItems[existItem].qty += 1
      // } else {
      //   const temp = { ...item, qty: 1 }
      //   state.cartItems.push(temp)
      //   // cartItems = { ...state.cartItems, temp }
      // }

      // METHOD 2
      // var item = action.payload
      // var existItem = state.cartItems.find((x) => x.id === item.id)

      // if (existItem >= 0) {
      //   state.cartItems[existItem].cartQuantity += 1
      // } else {
      //   const temp = { ...item, cartQuantity: 1 }
      //   state.cartItems.push(temp)
      // }

      // METHOD 1
      // const itemExist = state.cartItems.findIndex(
      //   (item) => item.id === action.payload.id,
      // )
      // if (itemExist >= 0) {
      //   state.cartItems[itemExist].cartQuantity += 1
      // } else {
      //   const tempProduct = {
      //     ...action.payload,
      //     cartQuantity: 1,
      //   }
      //   state.cartItems.push(tempProduct)
      // }

      // localStorage.setItem('total', JSON.stringify(state.total))
      localStorage.setItem('cart', JSON.stringify(state.cartItems)) // giving null in browser localstorage and also doesnt work with the state return method.
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress),
      )
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem(
        'paymentMethod',
        JSON.stringify(state.paymentMethod),
      )
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    //   updateCart: (state, action) => {
    //     const item = action.payload

    //     const itemExist = state.cartItems.findIndex(
    //       (x) => x._id === action.payload._id,
    //     )

    //     if (itemExist >= 0) {
    //       const cartExistingItem = {
    //         ...(state.cartItems[itemExist].qty = action.payload.qty),
    //       }

    //       state.cartItems.push(cartExistingItem)
    //     } else {
    //       const temp = { ...item, qty: action.payload.qty }

    //       state.cartItems.push(temp)
    //     }
    //     localStorage.setItem('cart', JSON.stringify(state.cartItems))
    //   },
    // },

    // extraReducers: (builder) => {
    //   builder
    //     .addCase(addToCart.pending, (state) => {
    //       state.isLoading = true
    //     })
    //     .addCase(addToCart.fulfilled, (state, action) => {
    //       state.isSuccess = true
    //       state.isLoading = false

    //       // METHOD 3
    //       const itemExist = state.cartItems.find(
    //         (item) => item._id === action.payload._id,
    //       )

    //       if (itemExist) {
    //         const qtyInx = state.cartItems.findIndex(
    //           (item) => item._id === action.payload._id,
    //         )

    //         state.cartItems[qtyInx].qty = action.payload.qty
    //       } else {
    //         // const { _id, name, image, brand, qty } = action.payload
    //         state.cartItems.push([action.payload])
    //       }

    //       // state.cartItems = action.payload // METHOD 1

    //       //   // METHOD 2
    //       // const item = action.payload
    //       // const existItem = state.cartItems.find(
    //       //   (x) => x._id === action.payload._id,
    //       // )

    //       // if (existItem) {
    //       //   return {
    //       //     ...state,
    //       //     cartItems: state.cartItems.map((x) =>
    //       //       x.id === existItem.id ? item : x,
    //       //     ),
    //       //   }
    //       // } else {
    //       //   return {
    //       //     ...state,
    //       //     cartItems: [...state.cartItems, item],
    //       //   }
    //       // }

    //       // if (existItem) {
    //       //   const obj = {
    //       //     ...state.cartItems,
    //       //     cartItems: state.cartItems.map((x) =>
    //       //       x._id === existItem._id ? action.payload : x,
    //       //     ),
    //       //   }
    //       //   state.cartItems.push(obj)
    //       // } else {
    //       //   const temp = { ...state.cartItems, cartItems: action.payload }
    //       //   state.cartItems.push(temp)
    //       // }
    //     })
    //     .addCase(addToCart.rejected, (state, action) => {
    //       state.isLoading = false
    //       state.isError = true
    //       state.message = action.payload
    //     })
    // },
  },
})

export const {
  removeFromCart,
  addToCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart
} = cartSlice.actions
export default cartSlice.reducer