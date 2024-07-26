import {Outlet} from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';

const Admin = () => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Admin;