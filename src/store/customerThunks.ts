import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDishes, Dish} from '../types';
import {AppDispatch} from '../app/store';
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