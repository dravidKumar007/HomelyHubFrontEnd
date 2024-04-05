import { useEffect,useState } from 'react';
import './App.css';
import ListComp from './ListComp'; 
import { Router as  Router,Route, Link,  Routes, BrowserRouter } from 'react-router-dom';
import Property from './Property';
import Login from './Login';
import SignIn from './SignIn';
import Forget from './Forget';
import Profile from './Profile';
import UserBook from './UserBook';

function App() {
  var[propname,setname]=useState("")
  var[datediff,setdiff]=useState(0)
  var[guest,setguest]=useState(0);
 var [propertyList, setPropertyList] = useState([{propertyName:'null',price:0,address:{area:"",city:"",state:"",pincode:""},images:[{url:""}]}]);
  useEffect(() => {
    fetch("http://localhost:1000/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPropertyList(data)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

      console.log(propertyList[0])
  }, []);
 
 
  const search = (event) => {
    event.preventDefault();
    var searchText = document.querySelector('.proptext').value;
    setname(searchText);
    var from =  new Date(document.querySelector('.from').value);
    var to = new Date( document.querySelector('.to').value);


    var difference = Math.abs(to.getTime()- from.getTime() );
    if(difference>0)
    setdiff(Math.ceil(difference / (1000 * 3600 * 24)))



    var guestValue = document.querySelector('.guest').value;
    var guests = guestValue ? parseInt(guestValue) : 0; 
    setguest(guests);
    console.log(guest)
  };

  return (
    
<BrowserRouter>
 
    <div className="App">
      <div className='header'>
        <Link to="/">

        <img src='https://dravidkumar007.github.io/DALL%C2%B7E%202024-01-12%2012.28.50.png'/>
        </Link>
        <form>
          <input className='proptext' type="text" placeholder="Search destination"/>
          <input className='from' type="date" placeholder='From Date' />
          <input className='to' type="date" placeholder='To Date' />
          <input className='guest' type='number' placeholder='Add Guest'/>
          <button onClick={search}>🔍</button>
        </form>
        <Link to={"/login"}>
        <img  src='https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png'/>
        </Link>
      </div>
      <Routes>
      <Route path='/Forget' element={<Forget/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/Profile/Booking' element={<UserBook/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path="/" element={
          propertyList.map((list, index) => (
            (list.propertyName.toLowerCase().includes(propname.toLowerCase()) && list.maximumNight>=datediff && list.maximumGuest>=guest) ? (
              <Link to={"/"+list.propertyName} >
                <ListComp
                 
                 className="list"
                 head={list.images[0].url}
                  sub={list.propertyName}
                  loc={`${list.address.area},\n${list.address.city},\n${list.address.state},\n${list.address.pincode}`}
                  price={list.price}
                  />
              </Link>
            ) : null
            ))
          }/>
    
    <Route path='/:name' element={<Property/>}/>
    
      </Routes>


    </div>

          </BrowserRouter>
  );
}

export default App;
