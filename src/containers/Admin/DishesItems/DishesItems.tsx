import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectDishes} from '../../../store/dishesSlice';
import DishItem from './DishItem';
import {useEffect} from 'react';
import {fetchDishes} from '../../../store/dishesThunks';

const DishesItems = () => {
  const dishes = useAppSelector(selectDishes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchDishes());
  }, [dispatch, dishes]);

  return (
    <>
      <h1 className="text-center text-primary-emphasis my-4">Dishes</h1>
      <div className="row justify-content-center">
        {dishes.map((dish) => (
          <DishItem
            key={dish.id}
            id={dish.id}
            name={dish.name}
            price={dish.price}
            image={dish.img}
          />
        ))}
      </div>
    </>
  );
};

export default DishesItems;