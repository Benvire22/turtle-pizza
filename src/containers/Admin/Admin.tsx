import {Link, Outlet} from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';
import {useAppSelector} from '../../app/hooks';
import {selectFetchLoading} from '../../store/dishesSlice';
import Spinner from '../../components/Spinner/Spinner';

const Admin = () => {
  const isLoading = useAppSelector(selectFetchLoading);
  return (
    <>
      {isLoading && <Spinner />}
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-xl">
        <div className="row justify-content-end">
          <Link to="add-dish" className="btn btn-success col-2 fs-3">Add Dish</Link>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default Admin;