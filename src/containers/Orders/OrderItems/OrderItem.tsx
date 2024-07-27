import React from 'react';
import {CartDish} from '../../../types';
import {useAppSelector} from '../../../app/hooks';
import {selectDelivery} from '../../../store/dishesSlice';

interface Props {
  cardDishes: CartDish[];
  onDelete: VoidFunction;
}

const OrderItem: React.FC<Props> = ({onDelete, cardDishes}) => {
  const delivery = useAppSelector(selectDelivery);

  const getTotalSum = cardDishes.reduce((sum, cardDish) => {
    return sum + cardDish.amount * cardDish.dish.price;
  }, 0);

  const getSum = (dish: CartDish) => {
    return dish.dish.price * dish.amount;
  };

  return (
    <div className="col-7 d-flex rounded align-items-center border mb-3 p-3 fs-4">
      <div className="col-7 border-end pe-4 me-4 align-items-center justify-content-between">
        {cardDishes.map((dish) => (
          <p className="d-flex" key={dish.dish.id}>{dish.amount} x
            <span className="mx-3 text-primary-emphasis">{dish.dish.name}</span>
            <strong className="ms-auto text-primary-emphasis">{getSum(dish)} KGS</strong>
          </p>
        ))}
      </div>
      <div className="justify-content-start d-flex flex-column">
        <h4>Order total</h4>
        <strong className="text-primary-emphasis fs-5">Delivery: {delivery} KGS</strong>
        <strong className="text-primary-emphasis">Total: {getTotalSum + delivery} KGS</strong>
        <button className="btn btn-success mt-3 fs-5" onClick={onDelete}>Complete order</button>
      </div>
    </div>
  );
};

export default OrderItem;