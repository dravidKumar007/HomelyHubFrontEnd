import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
const loadInitialState = () => {
    try {
      const serializedState = localStorage.getItem('user');
      if (serializedState === null) {
        return {
          username: '',
          email: '',
          password: '',
        };
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return {
        username: '',
        email: '',
        password: '',
      };
    }
  };

  const saveState = state => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('user', serializedState);
    } catch(err) {
      console.log(`Error saving state: \n`+err)
    }
  };
export const CustomerSlice = createSlice({
    name: 'Customer',
    initialState:loadInitialState(),
    reducers: {
        setUsername: (state, action) => {
          state.username = action.payload;
          saveState(state);
        },
        setEmail: (state, action) => {
          state.email = action.payload;
          saveState(state);
        },
        setPassword: (state, action) => {
          state.password = action.payload;
          saveState(state);
        }
    }
})
export const { setUsername, setEmail, setPassword } = CustomerSlice.actions;

export default CustomerSlice.reducer;

