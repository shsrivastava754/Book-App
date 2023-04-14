import React from 'react'
import '../style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const User = (props) => {
  const [donations, setDonations] = useState(0);
  
  useEffect(() => {
    fetchHandler().then((data)=>{
        setDonations(data.donations);
    });
  }, []);
  
  const userId = props.user._id;
  
  const url = `http://localhost:3001/users/getDonations/${userId}`;
  const fetchHandler = async ()=>{
    return await axios.get(url).then((res)=>res.data);
  };
  
  return (
    <>
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.username}</td>
      <td>Rs. {props.user.email}</td>
      <td>{donations}</td>
    </tr>
    </>
  )
}

export default User;