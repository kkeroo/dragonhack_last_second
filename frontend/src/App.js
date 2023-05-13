import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from '@firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SignIn  from './SignIn';
import SignUp from './SignUp';
import { useState } from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/MenuComponent';

const stripePromise = loadStripe('pk_test_51N7IBYAJLTU2dEQVnjksDVbhGmCQjD9D0kIvnLdDCPc4hczDIqHERCrKSSf0EnppUhj7TPHwmWjSeyxc1ArFULCl00l9hiUgta');

const firebaseConfig = {
  apiKey: "AIzaSyDgTH3JR5Iz-28b90TWtvPJIw0YbJzZsuw",
  authDomain: "dragonhack-last-second.firebaseapp.com",
  projectId: "dragonhack-last-second",
  storageBucket: "dragonhack-last-second.appspot.com",
  messagingSenderId: "755122264938",
  appId: "1:755122264938:web:1a4014d93965d23e502313",
  measurementId: "G-RH0X9NNNGV"
};
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Signed in successfully');
        let userId = user.uid;
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };
  const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          let userData = {
              uid: user.uid,
              username: username,
              email: user.email
          };
          axios({
              method: 'POST',
              url: 'http://localhost:8000/register',
              data: userData,
          }).then(response => {
              console.log(response);
          }).catch(err => {
              console.log(err);
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });
  };
  return (
    <div className="App">
        <Menu></Menu>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn user={user} email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSignIn={handleSignIn}></SignIn>}></Route>
            <Route path='signup' element={<SignUp email={email} username={username} password={password} setEmail={setEmail} setPassword={setPassword} setUsername={setUsername} handleSignUp={handleSignUp}></SignUp>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
