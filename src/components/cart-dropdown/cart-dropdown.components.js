import React from "react";
import {connect} from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.components";
import {selectCartItems} from "../../redux/cart/cart.selector";
import {createStructuredSelector} from "reselect";
import { useNavigate } from 'react-router-dom';

import './cart-dropdown.style.scss'

const CartDropdown = ({cartItems}) => {
  let navigate = useNavigate();

  return (
    <div className='cart-dropdown'>
      {
        cartItems.length > 0 ?
          <div className='cart-items'>
            {
              cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
            }
          </div>
          :
          <span className={'empty-message'}>Your cart is empty</span>
      }
      <CustomButton onClick={() => navigate('/checkout')}> GO TO CHECKOUT </CustomButton>
    </div>
  )
}

const mapStateToProps = state => createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);