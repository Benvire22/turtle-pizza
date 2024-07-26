import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import AddDish from './containers/AddDish/AddDish';
import EditDish from './containers/EditDish/EditDish';
import DishesItems from './containers/Admin/DishesItems/DishesItems';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}>
        <Route path="/admin" element={<DishesItems />}/>
        <Route path="add-dish" element={<AddDish/>}/>
        <Route path="edit-dish/:id" element={<EditDish/>}/>
      </Route>
    </Routes>
  );
};

export default App;