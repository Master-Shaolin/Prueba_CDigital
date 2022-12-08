import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ShoppingBag() {

  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  return (
    <Link to={'/cart'}>
      <span className="position-relative">
          <FontAwesomeIcon icon={faShoppingBag} />
          <span className="position-absolute translate-middle badge rounded-pill bg-default">
              { cartTotalQuantity }
          </span>
          <span id='cartAmount'>${ cartTotalAmount }</span>
      </span>
    </Link>
  )
}

export default ShoppingBag