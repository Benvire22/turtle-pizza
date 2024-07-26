import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, Dish, DishMutation} from '../types';
import {AppDispatch} from '../app/store';
import axiosApi from '../axiosApi';

export const addDish = createAsyncThunk<void, ApiDish, {dispatch: AppDispatch}>(
  'dishes/addDish',
  async (dish: ApiDish) => {
    await axiosApi.post('/dishes.json', dish);
  },
);

export interface EditDishArg {
  id: string;
  dish: ApiDish;
}

export const editDish = createAsyncThunk<void, EditDishArg, {dispatch: AppDispatch}>(
  'dishes/editDish',
  async ({id, dish}) => {
    await axiosApi.put(`/dishes/${id}.json`, dish);
  },
);

export const fetchDishes = createAsyncThunk<Dish[], void, {dispatch: AppDispatch}>(
  'dishes/fetchDishes',
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

export const fetchOneDish = createAsyncThunk<DishMutation | null, string, {dispatch: AppDispatch}>(
  'dishes/fetchOneDish',
  async (id) => {
    const {data: dish} = await axiosApi.get<ApiDish | null>(`/dishes/${id}.json`);

    if (dish === null) {
      return null;
    }

    return {
      ...dish,
      price: dish.price.toString(),
    };
  },
);
