import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productListService from './productListService'

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async (_, thunkAPI) => {
    try {
      return await productListService.listProducts()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const productDetails = createAsyncThunk(
  'products/productDetails',
  async (id, thunkAPI) => {
    try {
      return await productListService.productDetails(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// REDUCERS
export const productListSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productListSlice.actions
export default productListSlice.reducer