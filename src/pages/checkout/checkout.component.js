import React from "react";

import './checkout.style.scss';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.components";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

const CheckoutPage = ({cartItems, total}) => (
  <div className='checkout-page'>
    <div className={'checkout-header'}>
      <div className={'header-block'}>
        <span>Product</span>
      </div>
      <div className={'header-block'}>
        <span>Quantity</span>
      </div>
      <div className={'header-block'}>
        <span>Price</span>
      </div>
      <div className={'header-block'}>
        <span>Remove</span>
      </div>
    </div>

    {
        cartItems.map(cartItem =>
          <CheckoutItem id={cartItem.id} cartItem={cartItem}/>
        )
    }

    <div className={'total'}> Total: ${total}   </div>

    <div className={'test-warning'}>
      ****please use the following credit cart to test payments****
      4242 4242 4242 4242 - 01/22 - 123
    </div>

    <StripeCheckoutButton price={total}/>
  </div>
)

 const mapStateToProps = createStructuredSelector({
   cartItems: selectCartItems,
   total: selectCartTotal
 })
export default connect(mapStateToProps)(CheckoutPage);