import React from 'react'
import '../style.css';

const User = (props) => {

  return (
    <>
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.username}</td>
      <td>Rs. {props.user.email}</td>
      <td>100</td>
    </tr>
    </>
  )
}

export default User;