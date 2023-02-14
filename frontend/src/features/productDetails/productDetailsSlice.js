import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productDetailsService from './productDetailsService'

const initialState = {
  product: { reviews: [] },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const productDetails = createAsyncThunk(
  'products/productDetails',
  async (id, thunkAPI) => {
    try {
      return await productDetailsService.productDetails(id)
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
export const productDetailsSlice = createSlice({
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
      .addCase(productDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.product = action.payload
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productDetailsSlice.actions
export default productDetailsSlice.reducer