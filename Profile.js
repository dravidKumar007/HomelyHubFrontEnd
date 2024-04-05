import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setEmail,setLogfalse,setPassword,setUsername,setPhoneNo,setImage } from './features/CustomerSlice';


const Profile = () => {

  
  const [window,setwindow]=useState(false)
  const [username, setUsernameS] = useState(useSelector(state=>state.customer.username));
  const [phoneNo, setPhoneNoS] = useState(useSelector(state=>state.customer.phoneNo));
    const dispatch = useDispatch();
   const log= useSelector(state=>state.customer.LoggedIn)
    if(log==false){
        window.location.href = '/Login';
    }
    const img=useSelector(state=> state.customer.image)
    const name = useSelector(state=> state.customer.username)
     const[image,setimg]=useState("https://th.bing.com/th/id/OIP.NfQXJGQIFEdceeyi1sIW8AAAAA?rs=1&pid=ImgDetMain")
    
     const handleUpload = (info) => {
      if (info.event === 'success') {
          setimg(info.info.secure_url);
      }
  };
     const Email = useSelector(state=> state.customer.email)
 const Phone = useSelector(state=> state.customer.phoneNo)
     useEffect(()=>{
if(img!==""){
    setimg(img)
}
 },[])

var cloudName="secret not for public"





  async function  handleFileChange (e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
   
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: new FormData().append('file', file),
      });
      
      const data = await response.json();
     setImage(data.secure_url);
     console.log(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
 


 }
 
    return (
    <div>
      <div>
        <center className='profileToggle '>
            <Link to='/Profile'>
            <button>My Profile</button>
            </Link>
            <Link to='/Profile/Booking'>
            <button>My Booking</button>
            </Link>
            <Link to='/Profile/accomodation'>
            <button>My Accommodations</button>
            </Link>
            </center>
            <div className="Row border">
                
                <img src={image} alt='Profile photo' className='ProfilePhoto'></img>
                <div className='details'>
                    <div ><h1 style={{display:"inline-block"}}>Name: </h1> <h1 style={{display:"inline-block",fontWeight:"normal"}}> {name}</h1></div>
                    <div ><h1 style={{display:"inline-block"}}>Email: </h1> <h1 style={{display:"inline-block",fontWeight:"normal"}}> {Email}</h1></div>
                    <div ><h1 style={{display:"inline-block"}}>phoneNo: </h1> <h1 style={{display:"inline-block",fontWeight:"normal"}}> {Phone}</h1></div>
               <div className='Row'><button onClick={()=>{dispatch(setEmail(''));dispatch(setImage(''));dispatch(setUsername(''));dispatch(setPhoneNo(0));dispatch(setPassword(''));dispatch(setLogfalse());window.location.href = '/SignIn';}}>Logout</button><button onClick={()=>{setwindow(true)}}>Edit Profile</button><button>Change Password</button></div>
                </div>
            </div>
      </div>

      { window ?(
      <>
        <div className='window'>
          <div className='boxwindow '>
            <div className='buttons'>
              <button  onClick={()=>{setwindow(false)}}>X</button>
            </div>
            <h1>Edit Profile </h1>
            <br />
            <h1>Name</h1>
            <input
              className="input namesi"
              type="text"
              placeholder="Enter your Name"
              value={username}
              onChange={(e) => setUsernameS(e.target.value)}
              required
            />
            <h1>phoneNo:</h1>
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
            />
            <div className='Row'>
              <img className='boximg' src={image}></img>
              <input type="file" onChange={handleFileChange} />
            </div>
            <input type='i' />
          </div>
        </div>
      </>
    ):null}
    </div>
  )
}

export default Profile
