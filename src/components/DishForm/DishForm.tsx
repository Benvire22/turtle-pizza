import {Link, useParams} from 'react-router-dom';
// import {useAppSelector} from '../../app/hooks';
import React, {useEffect, useState} from 'react';
import {ApiDish, DishMutation} from '../../types';
import {useAppSelector} from '../../app/hooks';
import {selectCurrentDish} from '../../store/dishesSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: DishMutation = {
  name: '',
  price: '',
  img: '',
};

interface Props {
  onSubmit: (contact: ApiDish) => void;
  isLoading: boolean,
}

const DishForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [formData, setFormData] = useState(initialState);
  const currentDish = useAppSelector(selectCurrentDish);
  const {id} = useParams();

  useEffect(() => {
    if (id && currentDish) {
      setFormData(currentDish);
    }
  }, [id, currentDish]);

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newDish: ApiDish = {
      ...formData,
      price: parseInt(formData.price),
    };

    onSubmit(newDish);
    setFormData(initialState);
  };

  return (
    <>
      <div className="row px-5 fs-5">
        <h3 className="text-primary-emphasis text-center fs-1 mb-5">{id ? 'Edit' : 'Add'} dish</h3>
        <div className="row mt-2 justify-content-center">
          <div className="col-5 text-primary-emphasis">
            <form onSubmit={sendForm}>
              <div className="form-group mb-3">
                <label htmlFor="name" className="fs-4 mb-2">Dish Name</label>
                <input
                  type="text"
                  value={formData.name}
                  id="name"
                  name="name"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  placeholder="Enter Dish name"
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="price" className="fs-4 mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  id="price"
                  name="price"
                  className="form-control border-primary fs-5 mb-4 py-2"
                  placeholder="Enter price"
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="img" className="fs-4 mb-2">Image</label>
                <input
                  type="url"
                  value={formData.img}
                  id="img"
                  name="img"
                  className="form-control border-primary fs-5 mb-4 py-2"
                  placeholder="Enter dish image"
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group mb-3 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success text-white fs-4 px-3 py-2 mb-3 me-3"
                  disabled={isLoading}
                >
                  {isLoading && <ButtonSpinner/>}
                  save
                </button>
                <Link
                  to="/admin"
                  className="btn btn-primary text-white fs-4 px-4 py-2 mb-3"
                >
                  On Admin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishForm;
