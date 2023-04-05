import React from 'react'

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