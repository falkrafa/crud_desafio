import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import postReducer from './postReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;