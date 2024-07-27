
export interface Dish {
  id: string
  name: string;
  img: string;
  price: number;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  name: string;
  img: string
  price: string;
}

export interface ApiOrder {
  [id: string]: number;
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface OrderCartDish {
  id: string;
  cartDishes: CartDish[];
}