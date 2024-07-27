import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartDish, Dish, ApiOrder} from '../types';
import {fetchCustomerDishes, sendOrder} from './customerThunks';

export interface CustomerState {
  orderDishes: ApiOrder;
  dishes: Dish[];
  cartDishes: CartDish[];
  fetchLoading: boolean;
  isCompletedOrder: boolean;
  totalSum: number;
  isModalShow: boolean;
  delivery: number;
}

const initialState: CustomerState = {
  orderDishes: {},
  dishes: [],
  cartDishes: [],
  isCompletedOrder: false,
  fetchLoading: false,
  isModalShow: false,
  delivery: 150,
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
        state.totalSum = state.delivery + state.cartDishes.reduce((sum, cartDish) => {
          return sum += cartDish.amount * cartDish.dish.price;
        }, 0);
      },

      showModal: (state) => {
        state.isModalShow = true;
      },

      closeModal: (state) => {
        state.isModalShow = false;
      },

      deleteCartDish: (state, {payload: id}: PayloadAction<string>) => {
        state.cartDishes = state.cartDishes.filter((cardDish) => cardDish.dish.id !== id);
      },

      clearCart: (state) => {
        state.cartDishes = [];
      }

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

      builder.addCase(sendOrder.pending, (state) => {
        state.isCompletedOrder = true;
      }).addCase(sendOrder.fulfilled, (state) => {
        state.isCompletedOrder = false;
      }).addCase(sendOrder.rejected, (state) => {
        state.isCompletedOrder = false;
      });
    },
    selectors: {
      selectCustomerDishes: (state) => state.dishes,
      selectCustomerCartDishes: (state) => state.cartDishes,
      selectCustomerLoading: (state) => state.fetchLoading,
      selectTotalSum: (state) => state.totalSum,
      selectCompleteOrder: (state) => state.isCompletedOrder,
      selectModalShow: (state) => state.isModalShow,
      selectDelivery: (state) => state.delivery,
    }
  },
);

export const customerReducer = customerSlice.reducer;

export const {
  selectCustomerDishes,
  selectCustomerLoading,
  selectCustomerCartDishes,
  selectTotalSum,
  selectCompleteOrder,
  selectModalShow,
  selectDelivery,
} = customerSlice.selectors;

export const {
  addDishToCart,
  getTotalSum,
  showModal,
  closeModal,
  deleteCartDish,
  clearCart,
} = customerSlice.actions;