import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

const BookDetails = () => {
    const id = useParams().id;
    const [book, setBook] = useState();

    const fetchHandler = async ()=>{
        return await axios.get(`http://localhost:3001/:${id}`).then((res)=>res.data);
    };
    
    useEffect(() => {
      fetchHandler().then((data)=>{
        setBook(data.book);
      });
    }, [])
    
  return (
    <div className='container mt-4 formContainer p-4'>
        <h3 className='text-center'>Book Details</h3>
        <div className="details">
            <h4>Title: {book?.title}</h4>
            <h4>Author: {book?.author}</h4>
            <h4>Description: {book?.description}</h4>
            <h4>Status: {book?.status}</h4>
            <h4>Price: {book?.price}</h4>
        </div>
    </div>
  )
}

export default BookDetails