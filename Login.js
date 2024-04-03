import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='box'>
      <div className='center'>
        <h1 style={{}}>Login</h1>
        <input className="input" type="email" placeholder="Enter your Email" ></input><br/>
        <input  className="input" type="password" placeholder="Enter your Password" ></input>
        <button style={{background:"blue",color:'white'}}>Login</button>

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
