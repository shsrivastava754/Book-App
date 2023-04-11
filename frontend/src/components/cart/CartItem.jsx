import React from 'react'
import '../style.css';

const CartItem = (props) => {
  return (
    <>
    
    <tr>
      <td>{props.item.title}</td>
      <td>{props.item.author}</td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
    </tr>
    
    </>
  )
}

export default CartItem;