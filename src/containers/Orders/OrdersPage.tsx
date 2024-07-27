import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchDishes, fetchOrders} from '../../store/dishesThunks';
import OrderItems from './OrderItems/OrderItems';
import {selectOrdersLoading} from '../../store/dishesSlice';
import Spinner from '../../components/Spinner/Spinner';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectOrdersLoading);

  useEffect(() => {
    void dispatch(fetchDishes());
    void dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      <OrderItems />
    </>
  );
};

export default OrdersPage;