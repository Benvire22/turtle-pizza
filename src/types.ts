export interface DishOrder {
  id: string;
  name: string;
  email: string;
  photo: string
  phone: number;
}

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

export interface Order {
  [id: string]: number;
}

export interface Orders {
  [id: string]: Order;
}