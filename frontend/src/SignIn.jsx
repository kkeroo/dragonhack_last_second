import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from '@firebase/app';

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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Signed in successfully');
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;