import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
  
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
        <div>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Register</button>
        </div>
  );
}

export default SignUp;