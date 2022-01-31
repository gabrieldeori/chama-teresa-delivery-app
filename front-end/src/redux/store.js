import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './reducer/customerSlice';

export default configureStore({
  reducer: {
    customer: customerSlice,
  },
});
