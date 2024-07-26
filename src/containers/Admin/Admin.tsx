import {Link, Outlet} from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';

const Admin = () => {
  return (
    <>
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