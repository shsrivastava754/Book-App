import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = (props) => {
    // State variable for the date of creation
    const [createdAt,setCreatedAt] = useState();

    useEffect(() => {
      setCreatedAt(props.order.createdAt);
    });

    const navigate = useNavigate();

    // Conversion of the date saved in database
    const timestamp = new Date(createdAt);
    const date = timestamp.getDate();
    const month = timestamp.getMonth()+1;
    const year = timestamp.getFullYear();

    const formattedDay = date < 10 ? `0${date}` : date;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedTimestamp = `${formattedDay}-${formattedMonth}-${year}`;   
    
    // Navigate to the single order page
    const getOrderDetails = () => {
      navigate(`/orders/${props.order._id}`,{
        state: {order:props.order,total_price:props.order.total_price}
      });
    };
    
  return (
    <>
    <tr onClick={() => {getOrderDetails()}}>
        <td>
            {props.order.name}
        </td>
        <td>
          {props.order.email}
        </td>
        <td>
          {formattedTimestamp}
        </td>
        <td>
          Rs. {props.order.total_price}
        </td>
        <td>
            <span className='statusAvailable'>
                {props.order.status}
            </span>
        </td>
    </tr>
      </>
  )
}

export default Order;