import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogTrue,setPassword,setUsername,setPhoneNo,setImage,setEmail} from './features/CustomerSlice';

const Login = () => {
  const [responses,setRes]=useState({});
  const dispatch = useDispatch();
  const[email,setEmailid]=useState("");
  const[password,setPass]=useState("");
  async function log_in(e) {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:1000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password
        })
      });

      setRes(response);
      const data = await response.json();
      console.log(data);

       if (response.ok){
        dispatch(setEmail(data.email)); 
        dispatch(setUsername(data.username));
        dispatch(setEmail(data.email));
        dispatch(setPassword(data.password));
        dispatch(setPhoneNo(data.phoneNo));
        dispatch(setImage(data.image));
        dispatch(setLogTrue());
        window.location.href = '/Profile';
      }else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }
  return (
    <div className='box'>
      <div className='center'>
        <h1 style={{}}>Login</h1>
        <input className="input" value={email} onChange={(e)=>{setEmailid(e.target.value)}} type="email" placeholder="Enter your Email" ></input><br/>
        <input  className="input" value={password} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder="Enter your Password" ></input>
        <button onClick={log_in} style={{background:"blue",color:'white'}}>Login</button>

      </div>


        <div className='horizontal'>
            <Link to={"/Forget"}>
<h5>Forget Password</h5>
            </Link>
            <Link to={"/SignIn"}>

            <h5>new User ?</h5>
            </Link>
        </div>
    </div>
  )
}

export default Login
