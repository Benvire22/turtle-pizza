import DishForm from '../../components/DishForm/DishForm';
import {ApiDish} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {addDish} from '../../store/dishesThunks';

const AddDish = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(addDish(dish));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <DishForm onSubmit={onSubmit} isLoading={false} />
    </div>
  );
};

export default AddDish;