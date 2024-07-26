import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addDishToCart, getTotalSum, selectCustomerCartDishes, selectCustomerDishes} from '../../../store/customerSlice';
import {Dish} from '../../../types';
import {useEffect} from 'react';
import {fetchCustomerDishes} from '../../../store/customerThunks';
const CustomerDishes = () => {
  const dishes = useAppSelector(selectCustomerDishes);
  const cartDishes = useAppSelector(selectCustomerCartDishes);
  const dispatch = useAppDispatch();

  const addDish = (dish: Dish) => {
    dispatch(addDishToCart(dish));
    dispatch(getTotalSum());
  };

  console.log(cartDishes);

  useEffect(() => {
    void dispatch(fetchCustomerDishes());
  }, [dispatch]);

  return (
    <div className="row justify-content-center">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          onClick={() => addDish(dish)}
          className="d-flex text-primary-emphasis col-10 border rounded align-items-center justify-content-between border-primary p-3 px-4 mb-4">
          <div className="col-2 d-flex gap-5">
            <img className="w-100 h-auto d-inline-block border border-primary-subtle" src={dish.img} alt={dish.name}/>
          </div>
          <h4 className="text-primary-emphasis mt-2 fs-1">{dish.name}</h4>
          <strong className="fs-3">Price: {dish.price} KGS</strong>
        </div>
      ))}
    </div>
  );
};

export default CustomerDishes;