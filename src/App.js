import React from 'react';
import './App.css';

import {Routes, Route, Navigate} from "react-router-dom";

import {connect} from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInPage from "./pages/signinpage/signinpage.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import {createStructuredSelector} from "reselect";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapShot => {
          setCurrentUser({
                      id: snapShot.id,
                      ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/shop/*' element={<ShopPage/>}/>
            <Route exact path='/checkout' element={<CheckoutPage/>}/>
            <Route exact path='/signin' element={
              this.props.currentUser?
                <Navigate to="/" /> : <SignInPage/>}
            />
          </Routes>
      </div>
    )
  }
}


const mapStateToProps = state => createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);



