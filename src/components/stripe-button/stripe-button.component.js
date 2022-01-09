import React from "react";
import StripeCheckout from "react-stripe-checkout";

import './stripe-button.style.scss';


const StripeCheckoutButton = ({price}) => {
  const stripeprice = price * 1000;
  const publishableKey = 'pk_live_b028VviBCC5Wm4Ji9rbbMFIC00TjUpRQ31'

  const onToken = token =>{
    console.log(token);
    alert('Payment sucessfull')
  }

  return(
    <StripeCheckout
      label={'Pay Now'}
      name={'AZ companies'}
      billingAddress
      shippingAddress
      image={'https://svgshare.com/i/CUz.svg'}
      description={`Yuor total is $ ${price}`}
      amount={stripeprice}
      panelLabel={'Pay Now'}
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;