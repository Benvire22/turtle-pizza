import DishForm from '../../components/DishForm/DishForm';
import {ApiDish} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {editDish, fetchOneDish} from '../../store/dishesThunks';
import {useNavigate, useParams} from 'react-router-dom';
import {clearCurrentDish, selectEditLoading} from '../../store/dishesSlice';
import {useEffect} from 'react';

const EditDish = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectEditLoading);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(editDish({id, dish}));
      navigate('/admin');
      dispatch(clearCurrentDish());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DishForm onSubmit={onSubmit} isLoading={isLoading} />
  );
};

export default EditDish;