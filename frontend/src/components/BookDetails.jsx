import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


/**
 * 
 * @returns {React.Component} Details of book
 */
const BookDetails = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState();

  /**
   * 
   * @param {Object} book Book to be edited 
   */
  const editBook = (book)=>{
    navigate(`/books/${book._id}`,{state:{name:book.title,author: book.author,description: book.description,price: book.price,quantity: book.quantity}});
  };

  useEffect(() => {
    fetchHandler().then((data)=>{
      setBook(data.book);
    });
  }, []);

  const id = useParams().id;

  const fetchHandler = async ()=>{
      return await axios.get(`http://localhost:3001/:${id}`).then((res)=>res.data);
  };
  
    
  return (
    <div className='container mt-4 detailsContainer p-4'>
        <h3 className='text-center'>Book Details</h3>
        <div className="details">
            <h5><span>Title</span>: {book?.title}</h5>
            <h5><span>Author</span>: {book?.author}</h5>
            <h5 className='my-3 lh-base'><span>Description</span>: {book?.description}</h5>
            <h5><span>Status</span>: {book?.status}</h5>
            <h5><span>Price</span>: {book?.price}</h5>
            <button className="btn" onClick={()=>{editBook(book)}}>Edit Details</button>
        </div>
    </div>
  )
}

export default BookDetails