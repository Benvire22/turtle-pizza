import React from 'react';
import {Dish} from '../../../types';

interface Props {
  dish: Dish;
  onAdd: VoidFunction;
}

const CustomerDishesItem: React.FC<Props> = ({dish, onAdd}) => {
  return (
    <div
      key={dish.id}
      onClick={onAdd}
      className="d-flex btn text-primary-emphasis col-10 border rounded align-items-center justify-content-between border-primary p-3 px-4 mb-4">
      <div className="col-2 d-flex gap-5">
        <img className="w-100 h-auto d-inline-block border border-primary-subtle" src={dish.img} alt={dish.name}/>
      </div>
      <h4 className="text-primary-emphasis mt-2 fs-1">{dish.name}</h4>
      <strong className="fs-3">Price: {dish.price} KGS</strong>
    </div>
  );
};

export default CustomerDishesItem;