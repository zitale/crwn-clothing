import React from 'react';
import './App.css';

import {Routes, Route} from "react-router-dom";

import {connect} from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInPage from "./pages/signinpage/signinpage.component";

import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";

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
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/signin' element={<SignInPage/>}/>
        </Routes>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);



