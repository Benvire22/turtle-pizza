import DishForm from '../../components/DishForm/DishForm';
import {ApiDish} from '../../types';

const EditDish = () => {
  const onSubmit = (dish: ApiDish) => {
    console.log(dish);
  };

  return (
    <div>

      <DishForm onSubmit={onSubmit} isLoading={false} />
    </div>
  );
};

export default EditDish;