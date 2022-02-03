import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './style.css';

import { getSellers, postSale } from '../../services';
import { dataTestIds } from '../../utils';
import { calculateOrderTotalPrice } from '../../helpers';

const DeliveryForm = () => {
  const [availableSellers, setAvailableSellers] = useState([{
    id: null,
    name: 'Selecione',
  }]);

  const [seller, setSeller] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);

  const orderProducts = useSelector((state) => state.customer.orderProducts);
  const navigate = useNavigate();

  useEffect(() => getSellers(setAvailableSellers), []);

  const clearForm = () => {
    setAvailableSellers([{ id: null, name: 'Selecione' }]);
    setDeliveryAddress('');
    setDeliveryNumber(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { id: userId } = JSON.parse(localStorage.getItem('user'));
    const body = {
      userId,
      sellerId: Number(seller),
      totalPrice: calculateOrderTotalPrice(orderProducts),
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      products: orderProducts.map(({ id, quantity }) => ({ id, quantity })),
    };

    const saleId = await postSale(body);

    clearForm();
    navigate(`/customer/orders/${saleId}`);
  };

  return (
    <form onSubmit={ handleSubmit } className="delivery-form-container">
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select
          name="seller"
          value={ seller }
          onChange={ ({ target: { value } }) => setSeller(value) }
          data-testid={ dataTestIds['29'] }
        >
          {
            availableSellers.map(({ id: sellerId, name: sellerName }) => (
              <option key={ sellerId } value={ sellerId }>{ sellerName }</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          name="address"
          type="text"
          value={ deliveryAddress }
          onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
          data-testid={ dataTestIds['30'] }
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          name="number"
          type="number"
          value={ deliveryNumber }
          onChange={ ({ target: { value } }) => setDeliveryNumber(Number(value)) }
          data-testid={ dataTestIds['31'] }
        />
      </label>
      <button
        type="submit"
        data-testid={ dataTestIds['32'] }
      >
        Finalizar Pedido
      </button>
    </form>
  );
};

export default DeliveryForm;
