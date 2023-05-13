import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import logo from './logo-plachilko.svg';

const SignUp = (props) => {
    return (
            <div>
                <div className='container' style={{marginTop: '25vh'}}>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={logo}/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-4">
                            <div className="input-group my-2">
                                <input type="text" value={props.username} onChange={(e) => props.setUsername(e.target.value)} className="form-control input input-text" id="" placeholder="Username" />
                            </div>
                            <div className="input-group my-2">
                                <input type="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} className="form-control input input-text" id="" placeholder="Email" />
                            </div>
                            <div className="input-group my-2">
                                <input type="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} className="form-control input input-text" id="" placeholder="Password" />
                            </div>
                            <a onClick={props.handleSignUp} className="btn btn-primary btn-text my-1">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        // <div>
        //     <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <button onClick={handleSignUp}>Register</button>
        // </div>
  );
}

export default SignUp;