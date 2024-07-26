import DishForm from '../../components/DishForm/DishForm';
import {ApiDish} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addDish} from '../../store/dishesThunks';
import {useNavigate} from 'react-router-dom';
import {selectAddLoading} from '../../store/dishesSlice';

const AddDish = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAddLoading);
  const navigate = useNavigate();

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(addDish(dish));
      navigate('/admin');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DishForm onSubmit={onSubmit} isLoading={isLoading} />
  );
};

export default AddDish;