import CustomerDishes from './CustomerDishes/CustomerDishes';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  clearCart,
  closeModal, getTotalSum,
  selectCustomerLoading,
  selectModalShow,
  selectTotalSum,
  showModal
} from '../../store/customerSlice';
import MyModal from '../../components/MyModal/MyModal';
import Spinner from '../../components/Spinner/Spinner';
import {sendOrder} from '../../store/customerThunks';

const Home = () => {
  const totalSum = useAppSelector(selectTotalSum);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectCustomerLoading);
  const isShow = useAppSelector(selectModalShow);

  const show = () => {
    dispatch(showModal());
  };

  const close = () => {
    dispatch(closeModal());
  };

  const completeOrder = async () => {
    try {
      await dispatch(sendOrder());
      close();
      dispatch(clearCart());
      dispatch(getTotalSum());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header className="navbar py-3 navbar-expand-lg bg-primary">
        <div className="container-xl">
          <span className="text-white fs-1">Turtle Pizza</span>
        </div>
      </header>
      <main className="container-xl my-5">
        <div className="row justify-content-center">
          <div className="col-10 d-flex mb-5 align-items-center justify-content-between">
            <h1 className="text-primary-emphasis">Total Price: {totalSum} KGS</h1>
            <button className="btn btn-primary fs-4" onClick={() => show()}>Checkout</button>
          </div>
        </div>
        {isLoading && <Spinner />}
        {<CustomerDishes/>}
      </main>
      <MyModal
        onClose={() => close()}
        isOpen={isShow}
        completeOrder={completeOrder}
      />
    </>
  );
};

export default Home;