import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from '@firebase/app';
import logo from './logo-plachilko.svg';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (props.user){
            navigate('/home');
        }
    }, props.user);
    return (
        <div>
        {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
        {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        {/* <button onClick={handleSignIn}>Sign In</button> */}
        <div className='container mt-5 text-center'>
            <img src={logo} className='img-fluid'  style={{ marginTop: "15vh" }}  width="200"/>
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="input-group my-2">
                        <input type="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} className="form-control input input-text" id="" placeholder="Email" />
                    </div>
                    <div className="input-group my-2">
                        <input type="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} className="form-control input input-text" id="" placeholder="Password" />
                    </div>
                    <a onClick={props.handleSignIn} className="btn btn-primary btn-text mt-4">Login</a>
                    <br></br>
                    <a onClick={() => navigate('/signup')} class="btn btn-dark btn-text mt-2">Signup</a>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SignIn;