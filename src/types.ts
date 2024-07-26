export interface DishOrder {
  id: string;
  name: string;
  email: string;
  photo: string
  phone: number;
}

export interface Dish {
  name: string;
  price: number;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  name: string;
  price: string;
}
