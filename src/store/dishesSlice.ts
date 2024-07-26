import {createSlice} from '@reduxjs/toolkit';
import { Dish, DishMutation} from '../types';
import {addDish, editDish, fetchDishes, fetchOneDish} from './dishesThunks';

export interface DishesState {
  dishes: Dish[];
  existingDish: DishMutation | null;
  fetchOneLoading: boolean
  addLoading: boolean;
  editLoading: boolean;
  fetchLoading: boolean;
}

const initialState: DishesState = {
  dishes: [],
  existingDish: null,
  fetchOneLoading: false,
  addLoading: false,
  editLoading: false,
  fetchLoading: false
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
      clearCurrentDish: (state) => {
        state.existingDish = null;
      }
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
        state.fetchLoading = true;
      }).addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
        state.fetchLoading = false;
        state.dishes = dishes;
      }).addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
      });

      builder.addCase(fetchOneDish.pending, (state) => {
        state.fetchOneLoading = true;
      }).addCase(fetchOneDish.fulfilled, (state, {payload: dish}) => {
        state.fetchOneLoading = false;
        state.existingDish = dish;
      }).addCase(fetchOneDish.rejected, (state) => {
        state.fetchOneLoading = false;
      });
    },
    selectors: {
      selectAddLoading: (state) => state.addLoading,
      selectEditLoading: (state) => state.editLoading,
      selectFetchLoading: (state) => state.fetchLoading,
      selectDishes: (state) => state.dishes,
      selectCurrentDish: (state) => state.existingDish,
      selectOneLoading: (state) => state.fetchOneLoading,
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
} = dishesSlice.selectors;

export const {
  clearCurrentDish
} = dishesSlice.actions;