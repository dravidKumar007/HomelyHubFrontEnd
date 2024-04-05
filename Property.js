import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import './Property.css'
import GoogleMapReact from 'google-map-react';
const Property = () => {
const [map,setMap]=useState(<></>);
const Pin = () => (
  <img
    src="https://maps.google.com/mapfiles/kml/paddle/red-circle.png"
    alt="Pin"
    style={{
      width: '30px',
      height: '30px'
    }}
  />
);
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};


  const [coordinates, setCoordinates] = useState({lat:34.1525864, lng:77.57705349999999});
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const {name}=useParams();
    var [propertyList, setPropertyList] = useState([{propertyName:'null',amenities:[{name:"",icon:""}],price:0,address:{area:"",city:"",state:"",pincode:""},description:"",maximumGuest:0,images:[{url:""},{url:""},{url:""},{url:""},{url:""}]}]);
    

   
    useEffect(() => {
      fetch("http://localhost:1000/"+name)
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
    }, [name]);
     useEffect(() => { 
      console.log("working"+propertyList[0].address.area)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${toTitleCase(propertyList[0].address.area) +","+toTitleCase(propertyList[0].address.city )+"," + toTitleCase(propertyList[0].address.state+","+propertyList[0].address.pincode)}&key=AIzaSyBmLy4f4MRKF9-t7h4L-0WCtRY-GvHcVNc`)
    .then(response => response.json())
    .then(data => {
        const results = data.results;
        if (results && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            console.log(lat, lng);
            console.log("here");
            setCoordinates({ lat, lng });
            setMap(
              <div style={{ height: '400px', width: '40vw' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: 'AIzaSyBmLy4f4MRKF9-t7h4L-0WCtRY-GvHcVNc' }}
                      defaultCenter={{ lat, lng }}
                      defaultZoom={10}
                    >
                         <Pin
          lat={lat}
          lng={lng}
        />
                    </GoogleMapReact>
                  </div>
                         )
        }
    })
    .catch(error => {
        console.error('Error fetching coordinates:', error);
    });
  }, [propertyList[0].address.state]);
    
  return (
    <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" >
</link>
      <div className='head'>
        <h1>{propertyList[0].propertyName}</h1>
        <h3><span>  <i class="material-icons">home</i> </span>{`${propertyList[0].address.area},\n${propertyList[0].address.city},\n${propertyList[0].address.state},\n${propertyList[0].address.pincode}`}</h3>
      </div>
      <div className='flex'>
      <div className='big'><img src={propertyList[0].images[0].url}/></div>
      <div className='small'><img src={propertyList[0].images[1].url}/><img src={propertyList[0].images[2].url}/><img src={propertyList[0].images[3].url}/><img src={propertyList[0].images[4].url}/></div>
      </div>
<div className='flex'>
  <div>

<h1>
  Description
</h1>
{propertyList[0].description}
<br/>
<br/>
Max number of guests :{propertyList[0].maximumGuest}
<hr/>
<br/>
<h1>What this place offers</h1>
{propertyList[0].amenities.map((ele, index) => (<div className='icons'>
   <i class="material-icons" > {ele.icon} </i> <h3 key={index}>{ele.name}</h3></div>
))}
</div>
      

<div className='payment'>
  <center>

<h2>Price:${propertyList[0].price}/Per Night</h2>
  </center>
</div>
</div>
<hr style={{margin:'10px'}}/>
<div className='flex'>
{map}
<div style={{ height: '400px', width: '55vw' ,padding:'10px'}}>
<h1>
Extra Info
</h1>
<p>{propertyList[0].description}</p></div>
</div>

    </div>
  )
}

export default Property
