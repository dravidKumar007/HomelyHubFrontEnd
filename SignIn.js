import React from 'react'
import './Login.css'
const SignIn = () => {
  return (
    <div>
      <div className='box' >
        <div className='center'>

        <h1>Sign-In</h1>
        <form style={{boxShadow:'0px 0px 0px ', borderRadius:'0px'}} >

      <input className="input" type="text" placeholder="Enter your Name " required ></input><br/>
      <input className="input" type="email" placeholder="Enter your Email" required ></input><br/>
        <input  className="input" type="password" placeholder="Enter your Password"required ></input>
        <input  className="input" type="password" placeholder="Conform Password" required ></input>
<input className='input' style={{width:'20vw'}} type='number' min={8}max={12} required placeholder='Enter Phone Number'></input><br/>
<center>

        <button style={{background:"blue",color:'white'}}>Sign In</button>
</center>
        </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
