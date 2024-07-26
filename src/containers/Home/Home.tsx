import CustomerDishes from './CustomerDishes/CustomerDishes';
import {useAppSelector} from '../../app/hooks';
import {selectTotalSum} from '../../store/customerSlice';

const Home = () => {
  const totalSum = useAppSelector(selectTotalSum);

  return (
    <>
      <header className="navbar py-3 navbar-expand-lg bg-primary">
        <div className="container-xl">
          <span className="text-white fs-1">Turtle Pizza</span>
        </div>
      </header>
      <main className="container-xl my-5">
        <div className="row">
          <h1 className="text-primary-emphasis mb-5">Total Price: {totalSum} KGS</h1>
          <button>Checkout</button>
        </div>
        {<CustomerDishes />}
      </main>
    </>
  );
};

export default Home;