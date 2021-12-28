import React from "react";
import {connect} from "react-redux";

import './header.style.scss';

import {auth} from "../../firebase/firebase.utils";

import {ReactComponent as Logo} from "../../assets/crown.svg";
import {Link} from "react-router-dom";
import CartIcon from "../cart-icon/cart-icon.components";
import CartDropdown from "../cart-dropdown/cart-dropdown.components";



const Header = ({currentUser,hidden}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>

    <div  className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        currentUser?
          <div className='option' onClick={()=> auth.signOut()}>SIGNOUT</div>
          :
          <Link className='option' to='/signin'> SIGNIN </Link>
      }
      <CartIcon></CartIcon>

    </div>
    {
      hidden?
        null
        :
        <CartDropdown/>
    }
  </div>
)


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
});

export default connect(mapStateToProps)(Header);