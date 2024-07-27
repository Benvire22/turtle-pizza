import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addDishToCart, getTotalSum, selectCustomerDishes, selectFetchError} from '../../../store/customerSlice';
import {Dish} from '../../../types';
import {useEffect} from 'react';
import {fetchCustomerDishes} from '../../../store/customerThunks';
import CustomerDishesItem from './CustomerDishesItem';


const CustomerDishes = () => {
  const dishes = useAppSelector(selectCustomerDishes);
  const dispatch = useAppDispatch();
  const isFailedFetching = useAppSelector(selectFetchError);

  const addDish = (dish: Dish) => {
    dispatch(addDishToCart(dish));
    dispatch(getTotalSum());
  };

  useEffect(() => {
    void dispatch(fetchCustomerDishes());
  }, [dispatch]);

  return (
    <div className="row justify-content-center">
      {isFailedFetching && <h2 className="text-center my-4 text-danger">Sorry, fetching error was occurred!!</h2>}
      {dishes.map((dish) => (
        <CustomerDishesItem
          dish={dish}
          onAdd={() => addDish(dish)}
        />
      ))}
    </div>
  );
};

export default CustomerDishes;