import React from 'react';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../../../components/Spinner/ButtonSpinner';

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  onDelete: VoidFunction
  isDeleting?: string | false;
}

const DishItem: React.FC<Props> = ({id, name, price, image, onDelete, isDeleting}) => {
  return (
    <>
      <div className="d-flex text-primary-emphasis col-10 border rounded align-items-center justify-content-between border-primary p-2 mb-4">
        <div className="col-2 d-flex gap-5">
          <img className="w-100 h-auto d-inline-block border border-primary-subtle" src={image} alt={name}/>
        </div>
        <h4 className="text-primary-emphasis mt-2 fs-1">{name}</h4>
        <strong className="fs-3">Price: {price}</strong>
        <div className="d-flex gap-3">
          <Link to={`edit-dish/${id}`} className="btn btn-primary p-2 px-5 fs-3">Edit</Link>
          <button className="btn btn-danger p-2 px-4 fs-3 me-2" onClick={onDelete} disabled={isDeleting? isDeleting === id : false}>
            {isDeleting && isDeleting === id && (<ButtonSpinner />)}
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DishItem;