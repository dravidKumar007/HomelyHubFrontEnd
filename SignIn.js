import React from 'react'
import './Login.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { setEmail,setPassword,setUsername,setPhoneNo,setImage, setLogTrue } from './features/CustomerSlice';
const SignIn = () => {
  const [username, setUsernameS] = useState('');
  const [email, setEmailS] = useState('');
  const [password, setPasswordS] = useState('');
  const [confirmPassword, setConfirmPasswordS] = useState('');
  const [phoneNo, setPhoneNoS] = useState('');


  const dispatch = useDispatch();
  
  
  
  
  
  function signIn(e) {
   e.preventDefault();
   if(password == confirmPassword){
   var det= {
      username: username.toLowerCase(),
      email: email,
      password: password,
      phoneNo:phoneNo,
      image: '',
      LoggedIn:true
    }
    postData(det);
    localStorage.setItem('user', det);

   dispatch(setUsername(username));
    dispatch(setEmail(email.toLowerCase()));
    dispatch(setPassword(password));
    dispatch(setPhoneNo(phoneNo));
    dispatch(setLogTrue());
    async function postData(det) {
      try {
        const response = await fetch('http://localhost:1000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(det)
        });
    
        console.log(response); // Log the response object
            const data = await response.json();

        if (!response.ok) {
          alert(data.message)
        }
    else{
      console.log(data); 
      window.location.href = '/Profile';
    }
    
        
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }

  }
    else{alert("Passwords don't match");}
   
  }
  return (
    <div>
      <div className='box' >
        <div className='center'>

        <h1>Sign-In</h1>
        <form style={{boxShadow:'0px 0px 0px ', borderRadius:'0px'}}  onSubmit={signIn}>
            <input
              className="input namesi"
              type="text"
              placeholder="Enter your Name"
              value={username}
              onChange={(e) => setUsernameS(e.target.value)}
              required
            /><br />
            <input
              className="input emailsi"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmailS(e.target.value)}
              required
            /><br />
            <input
              className="input passwordsi"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPasswordS(e.target.value)}
              required
            />
            <input
              className="input conpasssi"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPasswordS(e.target.value)}
              required
            />
            <input
              className='input phonesi'
              style={{ width: '20vw' }}
              type='number'
              min={10000000}
              max={100000000000}
              placeholder='Enter Phone Number'
              value={phoneNo}
              onChange={(e) => setPhoneNoS(e.target.value)}
              required
            /><br/>
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
