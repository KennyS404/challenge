import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuDetails } from '../services/api';
const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer, 
    
  },
});

export const getMenuDetails = createAsyncThunk(
  'menu/getMenuDetails',
  async () => {
    const response = await fetchMenuDetails();
    return response; 
  }
);

  

createSlice({
  name: 'menu',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMenuDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.sections;
      });
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;