import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart'));

const initialState = {
  cartItems: cart ? cart.cartItems : [],
  cartTotalQuantity: cart ? cart.cartTotalQuantity : 0,
  cartTotalAmount: cart ? cart.cartTotalAmount : 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if(itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity
      }else {
        state.cartItems.push(action.payload)
      }

      state.cartTotalQuantity += action.payload.quantity

      const totalAmount = state.cartItems.reduce((currentTotal, item) => {
        return currentTotal + (item.quantity * item.price)
      }, 0)
      state.cartTotalAmount = parseFloat(totalAmount).toFixed(2)

      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateCart: (state, action) => {
      state.cartItems = action.payload.cartItems
      state.cartTotalQuantity = action.payload.cartTotalQuantity
      state.cartTotalAmount = action.payload.cartTotalAmount

      if(state.cartItems.length === 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(state))
      }
    }
  }
})

export const { addToCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;