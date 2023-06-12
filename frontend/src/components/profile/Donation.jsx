import React, { useEffect, useState } from 'react'

const Donation = (props) => {
    const [createdAt,setCreatedAt] = useState();

    useEffect(() => {
      setCreatedAt(props.donation.createdAt);
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
          {props.donation.title}
        </td>
        <td>
          {props.donation.author}
        </td>
        <td>
          Rs. {props.donation.sale_price}
        </td>
        <td>
          {formattedTimestamp}
        </td>
    </tr>
      </>
  )
}

export default Donation;