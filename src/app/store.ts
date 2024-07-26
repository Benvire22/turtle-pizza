import {configureStore} from '@reduxjs/toolkit';
import {dishesReducer} from '../store/dishesSlice';
import {customerReducer} from '../store/customerSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;