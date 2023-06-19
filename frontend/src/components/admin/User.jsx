import { useEffect, useState, React } from 'react';

import '../../styles/style.scss';

import UserService from '../../services/user.service';

/**
 * Function to return user component
 * @param {Object} props 
 * @returns {React.Component} User component
 */
const User = (props) => {
  //State variable for setting the donations made by the user
  const [donations, setDonations] = useState(0);
  const {name,username,email,_id} = props.user;
  const url = `${process.env.REACT_APP_API_URL}/users/getDonations/${_id}`;
  
  useEffect(() => {
    (async ()=>{
      const donationData =  await UserService.getDonations(url);
      setDonations(donationData.data.donations);
    })();
  }, []);
  
  return (
    <>
    <tr>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{donations}</td>
    </tr>
    </>
  )
}

export default User;