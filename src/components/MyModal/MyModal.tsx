import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {CartDish} from '../../types';
import {
  deleteCartDish,
  getTotalSum,
  selectCompleteOrder,
  selectCustomerCartDishes, selectDelivery,
  selectTotalSum
} from '../../store/customerSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  completeOrder: () => void;
}

const MyModal: React.FC<Props> = ({isOpen, onClose, completeOrder}) => {
  const isComplete = useAppSelector(selectCompleteOrder);
  const cartDishes = useAppSelector(selectCustomerCartDishes);
  const totalSum = useAppSelector(selectTotalSum);
  const delivery = useAppSelector(selectDelivery);
  const dispatch = useAppDispatch();


  const getSum = (cardDish: CartDish) => {
    return cardDish.amount * cardDish.dish.price;
  };

  const onDelete = (id: string) => {
    dispatch(deleteCartDish(id));
    dispatch(getTotalSum());
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row gap-2 ps-2 justify-content-center">
            {cartDishes.length > 0 ? (
              cartDishes.map((dish) => (
                <div className="col-8 border-bottom py-2 d-flex justify-content-between align-items-center" key={dish.dish.id}>
                  <span>{dish.dish.name}</span>
                  <strong>x{dish.amount}</strong>
                  <span>{getSum(dish)} KGS</span>
                  <button className="btn btn-danger" onClick={() => onDelete(dish.dish.id)}>X</button>
                </div>
              ))
            ) : <h3 className="text-center">Empty...</h3>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <p className="col-12 ps-2">Delivery: {delivery} KGS</p>
          <span className="me-auto fs-4 ">Total sum: {totalSum} KGS</span>
          <Button variant="success" disabled={isComplete || cartDishes.length < 1} onClick={completeOrder}>
            {isComplete && <ButtonSpinner />}
            Order
          </Button>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;