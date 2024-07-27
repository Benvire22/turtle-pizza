import {createSlice} from '@reduxjs/toolkit';
import {Dish, DishMutation, CartDish, OrderCartDish} from '../types';
import {addDish, deleteDish, deleteOrder, editDish, fetchDishes, fetchOneDish, fetchOrders} from './dishesThunks';

export interface DishesState {
  dishes: Dish[];
  errorLoadingDishes: boolean
  existingDish: DishMutation | null;
  deleteLoading: false | string;
  fetchOneLoading: boolean
  addLoading: boolean;
  editLoading: boolean;
  fetchLoading: boolean;
  fetchOrders: boolean;
  delivery: number;
  isOrderDeleting: boolean;
  orders: OrderCartDish[];
  errorFetchOrders: boolean
  orderDishes: CartDish[];
}

const initialState: DishesState = {
  dishes: [],
  errorLoadingDishes: false,
  existingDish: null,
  fetchOneLoading: false,
  deleteLoading: false,
  addLoading: false,
  delivery: 150,
  editLoading: false,
  fetchLoading: false,
  fetchOrders: false,
  orderDishes: [],
  errorFetchOrders: false,
  isOrderDeleting: false,
  orders: [],
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
      clearCurrentDish: (state) => {
        state.existingDish = null;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(addDish.pending, (state) => {
        state.addLoading = true;
      }).addCase(addDish.fulfilled, (state) => {
        state.addLoading = false;
      }).addCase(addDish.rejected, (state) => {
        state.addLoading = false;
      });

      builder.addCase(editDish.pending, (state) => {
        state.editLoading = true;
      }).addCase(editDish.fulfilled, (state) => {
        state.editLoading = false;
      }).addCase(editDish.rejected, (state) => {
        state.editLoading = false;
      });

      builder.addCase(fetchDishes.pending, (state) => {
        state.errorLoadingDishes = false;
        state.fetchLoading = true;
      }).addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
        state.fetchLoading = false;
        state.dishes = dishes;
      }).addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
        state.errorLoadingDishes = true;
      });

      builder.addCase(fetchOneDish.pending, (state) => {
        state.fetchOneLoading = true;
      }).addCase(fetchOneDish.fulfilled, (state, {payload: dish}) => {
        state.fetchOneLoading = false;
        state.existingDish = dish;
      }).addCase(fetchOneDish.rejected, (state) => {
        state.fetchOneLoading = false;
      });

      builder.addCase(deleteDish.pending, (state, {meta: {arg: dishId}}) => {
        state.deleteLoading = dishId;
      }).addCase(deleteDish.fulfilled, (state) => {
        state.deleteLoading = false;
      }).addCase(deleteDish.rejected, (state) => {
        state.deleteLoading = false;
      });

      builder.addCase(fetchOrders.pending, (state) => {
        state.errorFetchOrders = false;
        state.fetchOrders = true;
      }).addCase(fetchOrders.fulfilled, (state, {payload: ordersCardDishes}) => {
        state.fetchOrders = false;
        state.orders = ordersCardDishes;
      }).addCase(fetchOrders.rejected, (state) => {
        state.fetchOrders = false;
        state.errorFetchOrders = true;
      });

      builder.addCase(deleteOrder.pending, (state) => {
        state.fetchOrders = true;
      }).addCase(deleteOrder.fulfilled, (state) => {
        state.fetchOrders = false;
      }).addCase(deleteOrder.rejected, (state) => {
        state.fetchOrders = false;
      });
    },
    selectors: {
      selectAddLoading: (state) => state.addLoading,
      selectEditLoading: (state) => state.editLoading,
      selectErrorLoadingDishes: (state) => state.errorLoadingDishes,
      selectFetchLoading: (state) => state.fetchLoading,
      selectDishes: (state) => state.dishes,
      selectCurrentDish: (state) => state.existingDish,
      selectOneLoading: (state) => state.fetchOneLoading,
      selectDeleteLoading: (state) => state.deleteLoading,
      selectOrdersLoading: (state) => state.fetchOrders,
      selectErrorFetchOrders: (state) => state.errorFetchOrders,
      selectOrders: (state) => state.orders,
      selectDeleteOrder: (state) => state.isOrderDeleting,
      selectDelivery: (state) => state.delivery,
    }
  }
);

export const dishesReducer = dishesSlice.reducer;

export const {
  selectDishes,
  selectAddLoading,
  selectEditLoading,
  selectFetchLoading,
  selectCurrentDish,
  selectOneLoading,
  selectDeleteLoading,
  selectOrdersLoading,
  selectOrders,
  selectDeleteOrder,
  selectErrorLoadingDishes,
  selectErrorFetchOrders,
  selectDelivery,
} = dishesSlice.selectors;

export const {
  clearCurrentDish,
} = dishesSlice.actions;