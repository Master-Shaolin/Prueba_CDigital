import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsService from './productsService';

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Get products by categories
export const getProductsByCategory = createAsyncThunk('products/category', async(category, thunkAPI) => {
    try {
        return await productsService.getProductsByCategory(category)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get products
export const getProducts = createAsyncThunk('products/getAll', async(_, thunkAPI) => {
    try {
        return await productsService.getProducts();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductsByCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProductsByCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })
        .addCase(getProductsByCategory.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.products = null
        })
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.products = null
        })
    }
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;