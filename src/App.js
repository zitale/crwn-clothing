import React from 'react';
import './App.css';

import {
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";

const HatsPage = props => {
  const { hatId } = useParams();
  return (
    <div>
      <Link to='/'>Home</Link>
      <h1>HATS PAGE AT {hatId}</h1>
    </div>)
}

function App() {
  return (
    <div>
       <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/hats' element={<HatsPage />} />
         <Route path='/hats/:hatId' element={<HatsPage />} />
       </Routes>
    </div>
  );
}

export default App;
