import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/CustomerSlice';

export default configureStore({
  reducer: {
    customer: customerReducer,
  },
});