import {NavLink} from 'react-router-dom';

const ToolBar = () => {
  return (
    <>
      <nav className="navbar py-3 navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-xl">
          <NavLink to="/admin" className="navbar-brand fst-italic fs-2">Turtle pizza Admin</NavLink>
          <button
            className="navbar-toggler"
            type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4 fs-4">
              <li className="nav-item">
                <NavLink to="/admin" className="nav-link" aria-current="page">Dishes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="add-dish" className="nav-link">Orders</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;