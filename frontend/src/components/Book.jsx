import React from 'react'
import './style.css';

const Book = (props) => {
  return (
    <tr>
      <td>{props.srno}</td>
      <td>{props.book.title}</td>
      <td>{props.book.author}</td>
      <td>{props.book.price}</td>
      <td>{props.book.description}</td>
      <td>
        {
          (props.book.status==="available" || String(props.book.status)==='1')? <span className='statusAvailable'>Available</span>: <span className='statusSold'>Sold</span>
        }
      </td>
      <td><button className="btn btn-danger" onClick={()=>{props.deleteBook(props.book)}}>Delete</button><button className="btn btn-warning" onClick={()=>{props.editBook(props.book)}}>Edit</button></td>
    </tr>
  )
}

export default Book