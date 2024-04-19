import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import HomePage from './Components/HomePage';
import PaymentPage from './Components/PaymentPage';
import { auth,analytics } from './Firebase';

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if(user){
        setUserName(user.displayName);
      }
      else{
        setUserName("");
      }
    })
  }, [])
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage userName={userName} />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='payment' element={<PaymentPage userName={userName} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
