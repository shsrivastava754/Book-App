import { useEffect, useState, React } from 'react';
import '../../styles/style.css';
import axios from 'axios';
import { getDonations } from '../../services/app.services';

/**
 * Function to return user component
 * @param {Object} props 
 * @returns {React.Component} User component
 */
const User = (props) => {
  //State variable for setting the donations made by the user
  const [donations, setDonations] = useState(0);
  
  useEffect(() => {
    fetchHandler().then((data)=>{
        setDonations(data.donations);
    });
  }, []);
  
  const userId = props.user._id;
  
  const url = `http://localhost:3001/users/getDonations/${userId}`;
  
  /**
   * Function that sends API request to backend for getting number of donations
   * @returns {Number} 
   */
  const fetchHandler = async ()=>{
    return await getDonations(url);
  };
  
  return (
    <>
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.username}</td>
      <td>{props.user.email}</td>
      <td>{donations}</td>
    </tr>
    </>
  )
}

export default User;