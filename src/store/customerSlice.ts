import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartDish, Dish, Order} from '../types';
import {fetchCustomerDishes} from './customerThunks';

export interface CustomerState {
  orderDishes: Order;
  dishes: Dish[];
  cartDishes: CartDish[]
  fetchLoading: boolean;
  totalSum: number;
}

const initialState: CustomerState = {
  orderDishes: {},
  dishes: [],
  cartDishes: [],
  fetchLoading: false,
  totalSum: 0,
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
      addDishToCart: (state, {payload: dish}: PayloadAction<Dish>) => {
        const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

        if (index !== -1) {
          state.cartDishes[index].amount++;
        } else {
          state.cartDishes.push({
            amount: 1,
            dish: dish,
          });
        }
      },

      getTotalSum: (state) => {
       state.totalSum = state.cartDishes.reduce((sum, cartDish) => {
          return sum += cartDish.amount * cartDish.dish.price;
        }, 0);
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCustomerDishes.pending, (state) => {
        state.fetchLoading = true;
      }).addCase(fetchCustomerDishes.fulfilled, (state, {payload: dishes}) => {
        state.fetchLoading = false;
        state.dishes = dishes;
      }).addCase(fetchCustomerDishes.rejected, (state) => {
        state.fetchLoading = false;
      });
    },
    selectors: {
      selectCustomerDishes: (state) => state.dishes,
      selectCustomerCartDishes: (state) => state.cartDishes,
      selectCustomerLoading: (state) => state.fetchLoading,
      selectTotalSum: (state) => state.totalSum,
    }
  },
);

export const customerReducer = customerSlice.reducer;

export const {
  selectCustomerDishes,
  selectCustomerLoading,
  selectCustomerCartDishes,
  selectTotalSum,
} = customerSlice.selectors;

export const {addDishToCart, getTotalSum} = customerSlice.actions;