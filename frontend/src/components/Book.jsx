import React from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Book = (props) => {
  const navigate = useNavigate();

  const editBook = (book)=>{
    navigate(`/books/${book._id}`);
  };

  const getDetails = (book)=>{
    navigate(`/${book._id}`);
  };

  const deleteBook = (book)=>{
    axios.delete(`http://localhost:3001/${book._id}`).then(res=>res.data).then(()=>navigate("/")).then(()=>navigate("/"));
  };

  return (
    <tr>
      <td>{props.srno}</td>
      <td>{props.book.title}</td>
      <td>{props.book.author}</td>
      <td>Rs. {props.book.price}</td>
      <td>
        {
          (props.book.status==="available" || String(props.book.status)==='1')? <span className='statusAvailable'>Available</span>: <span className='statusSold'>Sold</span>
        }
      </td>
      <td>
        <button className="btn btn-danger mx-2" onClick={()=>{deleteBook(props.book)}}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button className="btn btn-warning mx-2" onClick={()=>{editBook(props.book)}}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="btn btn-primary mx-2"  onClick={()=>{getDetails(props.book)}}>
          <i className="fa-solid fa-circle-info"></i>
        </button>
      </td>
    </tr>
  )
}

export default Book