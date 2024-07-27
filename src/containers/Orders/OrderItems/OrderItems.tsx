import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectDeleteOrder, selectOrders} from '../../../store/dishesSlice';
import OrderItem from './OrderItem';
import {deleteOrder, fetchDishes, fetchOrders} from '../../../store/dishesThunks';
import Spinner from '../../../components/Spinner/Spinner';

const OrderItems = () => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectDeleteOrder);
  const orders = useAppSelector(selectOrders);

  const onDelete = async (id: string) => {
    try {
      await dispatch(deleteOrder(id));
      await dispatch(fetchDishes());
      await dispatch(fetchOrders());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isDeleting && <Spinner />}
      <div className="row justify-content-center my-4">
        {orders.length > 0
          ? (orders.map((order) => (
            <OrderItem
              key={order.id}
              cardDishes={order.cartDishes}
              onDelete={() => onDelete(order.id)}
            />)))
          : (<h1 className="text-secondary text-center my-5">Empty...</h1>)}
      </div>
    </>
  );
};

export default OrderItems;