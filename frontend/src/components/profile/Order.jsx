import React, { useEffect, useState } from 'react'

const Order = (props) => {
    const [createdAt,setCreatedAt] = useState();

    useEffect(() => {
      setCreatedAt(props.order.createdAt);
    });

    const timestamp = new Date(createdAt);
    const date = timestamp.getDate();
    const month = timestamp.getMonth()+1;
    const year = timestamp.getFullYear();

    const formattedDay = date < 10 ? `0${date}` : date;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedTimestamp = `${formattedDay}-${formattedMonth}-${year}`;    
    
  return (
    <>
    <tr>
        <td>
          {formattedTimestamp}
        </td>
        <td>
          {props.order.quantity}
        </td>
        <td>
          Rs. {props.order.total_price}
        </td>
        <td>
          {props.order.status}
        </td>
    </tr>
      </>
  )
}

export default Order;