import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Item } from './menuSlice';
interface CartState {
  items: Item[]; 
}
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.selectedOption === newItem.selectedOption);
      if (existingItem) {
      
        existingItem.quantity += newItem.quantity;
        existingItem.selectedOption = action.payload.selectedOption; 
      } else {
        state.items.push(newItem);
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item?.quantity) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if(item?.quantity)
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    
  },
});

export const { addItemToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
