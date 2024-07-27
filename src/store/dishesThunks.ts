import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, ApiOrders, CartDish, Dish, DishMutation, OrderCartDish,} from '../types';
import {AppDispatch, RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const addDish = createAsyncThunk<void, ApiDish, { dispatch: AppDispatch }>(
  'dishes/addDish',
  async (dish: ApiDish) => {
    await axiosApi.post('/dishes.json', dish);
  },
);

export interface EditDishArg {
  id: string;
  dish: ApiDish;
}

export const editDish = createAsyncThunk<void, EditDishArg, { dispatch: AppDispatch }>(
  'dishes/editDish',
  async ({id, dish}) => {
    await axiosApi.put(`/dishes/${id}.json`, dish);
  },
);

export const fetchDishes = createAsyncThunk<Dish[], void, { dispatch: AppDispatch }>(
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

export const fetchOneDish = createAsyncThunk<DishMutation | null, string, { dispatch: AppDispatch }>(
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

export const deleteDish = createAsyncThunk<void, string, { state: RootState }>(
  '/dishes/delete',
  async (dishId) => {
    await axiosApi.delete(`/dishes/${dishId}.json`);
  },
);

export const fetchOrders = createAsyncThunk<OrderCartDish[], void, { state: RootState, dispatch: AppDispatch }>(
  '/dishes/fetchOrders',
  async (_arg, thunkAPI) => {
    const {data: apiOrders} = await axiosApi.get<ApiOrders | null>(`/orders.json`);
    const ordersCartDishes: OrderCartDish[] = [];

    if (apiOrders === null) {
      return [];
    }

    const dishes = thunkAPI.getState().dishes.dishes;
    const orders = Object.keys(apiOrders).map((id) => ({
      ...apiOrders[id],
    }));

    const orderKeys = Object.keys(apiOrders);

    orders.forEach((order, i) => {
      const keys = Object.keys(order);
      const cartDishes: CartDish[] = [];

      dishes.forEach((dish, i) => {
        if (dish.id === keys[i]) {
          const cartDish = {
            dish: dish,
            amount: order[keys[i]],
          };

          cartDishes.push(cartDish);
        }
      });

      ordersCartDishes.push({
        id: orderKeys[i],
        cartDishes,
      });
    });
    return ordersCartDishes;
  },
);

export const deleteOrder = createAsyncThunk<void, string, {state: RootState}>(
  '',
  async (id) => {
    await axiosApi.delete(`/orders/${id}.json`);
  },
);