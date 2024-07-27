import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectDeleteLoading, selectDishes, selectErrorLoadingDishes} from '../../../store/dishesSlice';
import DishItem from './DishItem';
import {useEffect} from 'react';
import {deleteDish, fetchDishes} from '../../../store/dishesThunks';

const DishesItems = () => {
  const isDeleting = useAppSelector(selectDeleteLoading);
  const dishes = useAppSelector(selectDishes);
  const dispatch = useAppDispatch();
  const iFailedFetching = useAppSelector(selectErrorLoadingDishes);

  useEffect(() => {
    void dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-center text-primary-emphasis my-4">Dishes</h1>
      {iFailedFetching && <h2 className="text-center my-4 text-danger">Sorry, fetching error was occurred!!</h2>}
      <div className="row justify-content-center">
        {dishes.map((dish) => (
          <DishItem
            key={dish.id}
            id={dish.id}
            name={dish.name}
            price={dish.price}
            image={dish.img}
            onDelete={() => dispatch(deleteDish(dish.id))}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </>
  );
};

export default DishesItems;