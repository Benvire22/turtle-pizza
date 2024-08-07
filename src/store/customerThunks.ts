import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDishes, Dish, ApiOrder} from '../types';
import {AppDispatch, RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const fetchCustomerDishes = createAsyncThunk<Dish[], void, {dispatch: AppDispatch}>(
  'customer/fetchDishes',
  async () => {
    const {data: dishes} = await axiosApi.get<ApiDishes | null>('/dishes.json');

    if (dishes === null) {
      return [];
    }

    return Object.keys(dishes).map((id) => ({
     id,
     ...dishes[id],
    }));
  },
);

export const sendOrder = createAsyncThunk<void, void, {state: RootState}>(
  'customer/sendOrder',
  async (_, thunkAPI) => {
    const order = thunkAPI.getState().customer.cartDishes.reduce((acc, cartDish): ApiOrder => {
      return {
        ...acc,
        [cartDish.dish.id]: cartDish.amount,
      };
    }, {});

    await axiosApi.post('/orders.json', order);
  }
);