// src/store/menuSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuDetails } from '../services/api';

export const getMenuDetails = createAsyncThunk(
  'menu/getMenuDetails',
  async () => {
    const response = await fetchMenuDetails();
    return response.data;
  }
);
export interface ModifierItem {
  id: number;
  name: string;
  price: number;
}

export interface Modifier {
  id: number;
  name: string;
  items: ModifierItem[];
}
export interface Item {
  modifiers?: Modifier[]; 
  id: number;
  name: string;
  description: string;
  price: number;
  quantity?: number; 
  images: { id: number; image: string }[];
  selectedOption?: string; 
}

export interface Section {
  id: number;
  name: string;
  items: Item[];
  images: { id: number; image: string }[];
}

interface MenuData {
  sections: Section[];
}

interface MenuState {
  data: MenuData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MenuState = {
  data: null,
  status: 'idle',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMenuDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; 
      })
  },
});

export default menuSlice.reducer;
