import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
export default function UserBook() {
  return (
    <div>
    <div>
      <center className='profileToggle'>
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
    </div>
  </div>
  )
}
