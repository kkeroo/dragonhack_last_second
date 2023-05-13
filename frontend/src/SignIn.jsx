import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from '@firebase/app';
import logo from './logo-plachilko.svg';

// const firebaseConfig = {
//     apiKey: "AIzaSyDgTH3JR5Iz-28b90TWtvPJIw0YbJzZsuw",
//     authDomain: "dragonhack-last-second.firebaseapp.com",
//     projectId: "dragonhack-last-second",
//     storageBucket: "dragonhack-last-second.appspot.com",
//     messagingSenderId: "755122264938",
//     appId: "1:755122264938:web:1a4014d93965d23e502313",
//     measurementId: "G-RH0X9NNNGV"
//   };
// const firebase = initializeApp(firebaseConfig);
// const auth = getAuth(firebase);

const SignIn = (props) => {
  return (
    <div>
      {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
      {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      {/* <button onClick={handleSignIn}>Sign In</button> */}
      <div className='container' style={{marginTop: '25vh'}}>
        <div className="row justify-content-center">
            <div className="col-md-4">
                <img src={logo}/>
            </div>
        </div>
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="input-group my-2">
                    <input type="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} className="form-control input input-text" id="" placeholder="Email" />
                </div>
                <div className="input-group my-2">
                    <input type="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} className="form-control input input-text" id="" placeholder="Password" />
                </div>
                <a onClick={props.handleSignIn} className="btn btn-primary btn-text my-1">Login</a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;