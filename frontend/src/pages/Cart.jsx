import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { updateCart } from '../features/cart/cartSlice';

function Cart() {
  const {cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const [cart, setCart] = useState({
    cartItems: [...cartItems],
    cartTotalQuantity: cartTotalQuantity,
    cartTotalAmount: cartTotalAmount
  });

  const dispatch = useDispatch();

  const updateItemQuantity = (e,id,index) => {
    let items = [...cart.cartItems]
    let item = items.find((item) => item.id === id)

    item = {...item, quantity: parseInt(e.target.value.trim() !== "" ? e.target.value : 0)}
    items[index] = item

    handleUpdateCart({...cart, cartItems: items})
  }

  const deleteItem = (item) => {
    const filterItems = cart.cartItems.filter((_item) => { return _item !== item });
    handleUpdateCart({...cart, cartItems: filterItems});
  }

  const handleUpdateCart = (uCart) => {
    const totalQ = uCart.cartItems.reduce((currentTotal, item) => {
      return item.quantity + currentTotal
    }, 0)

    const totalA = uCart.cartItems.reduce((currentTotal, item) => {
      return currentTotal + (item.quantity * item.price)
    }, 0)

    uCart.cartTotalQuantity = totalQ
    uCart.cartTotalAmount = parseFloat(totalA).toFixed(2)

    setCart(uCart);
    dispatch(updateCart(uCart))
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className="container" id='cartMain'>
        {
          cart.cartItems.length <= 0 ?
          <div className='row'>
            <div className="col md-12">
              <div className='cart-empty-container text-center'>
                <h5>Your cart is currently empty</h5>
                <Link to='/' className='btn btn-dark' role='button'>CONTINUE SHOPPING</Link>
              </div>
            </div>
          </div> :
          <div className="row">
            <div className="col-md-7">
              <div id='productsListConatiner'>
                <div className='productQuantity'><span>{cart.cartTotalQuantity} Products</span></div>
                <ul>
                  { cart.cartItems.map((item, index) => (
                  <li className="productRow" key={index}>
                    <div className="cart_productImage">
                      <Link to={`/product/${item.id}`}><img src={item.image} alt="" /></Link>
                    </div>
                    <div className='cart_productInfo_container'>
                      <div className="cart_productName">
                        <span><Link to={`/product/${item.id}`}>{ item.name }</Link></span>
                      </div>
                      { item.size !== '' ?
                      <div className="cart_productDetails">
                        <span>Size: { item.size }</span>
                      </div> :
                      ''}
                      <div className="cart_productDelete">
                        <button onClick={() => deleteItem(item)} className='btn btn-link btnDeleteProduct'><FontAwesomeIcon icon={faTrashAlt} /> <span>Delete</span></button>
                      </div>
                    </div>
                    <div className='cart_productQP'>
                      <div className="cart_productQP_quantity">
                        <label>Quantity:</label>
                          <select className='form-control'
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(e,item.id,index)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                      </div>
                      <div className="cart_productQP_price">
                        <span>${ parseFloat(item.price * item.quantity).toFixed(2) }</span>
                      </div>
                    </div>
                  </li>
                  ))
                }
                </ul>
              </div>
            </div>
            <div className="col-md-4 text-center" id='cart_summary'>
              <div className="cart_summary_freeShipping">

              </div>
              <div className="cart_summary_subtotal">
                <h3>Order summary</h3>
                <div className="cart_subtotal_text">
                  <span id='subtotal_container'>Subtotal <span className='summary_text_ligth'>({cart.cartTotalQuantity} products)</span>:</span>
                  <span className="cart_subtotal_amount">${cart.cartTotalAmount}</span>
                </div>
                <div className='cart_total_text'>
                  <span id='total_container'>Total <span className='summary_text_ligth'>(Shipping & taxes calculated at checkout)</span>: </span>
                  <span className="cart_total_amount">${cart.cartTotalAmount}</span>
                </div>
              </div>
              <button className='btn btn-dark'>Checkout</button>
            </div>
          </div>
        }
      </div>
    </motion.div>
  )
}

export default Cart