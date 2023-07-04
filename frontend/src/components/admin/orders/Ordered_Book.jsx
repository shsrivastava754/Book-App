import React from 'react';
import { useNavigate } from 'react-router-dom';

const Ordered_Book = (props) => {
    const navigate = useNavigate();
    
    // Navigate to the single order page
    const getBookDetails = () => {
      navigate(`/book/${props.book.title}`,{
        state: {bookId:props.book.bookId}
      });
    };
    
  return (
    <>
    <tr>
        <td onClick={() => {getBookDetails()}}>
            {props.book.title}
        </td>
        <td onClick={() => {getBookDetails()}}>
          {props.book.author}
        </td>
        <td onClick={() => {getBookDetails()}}>
          {props.book.quantity}
        </td>
        <td onClick={() => {getBookDetails()}}>
          Rs. {props.book.sale_price}
        </td>
    </tr>
      </>
  )
}

export default Ordered_Book;