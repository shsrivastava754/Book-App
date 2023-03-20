import React from 'react'
import Book from './Book';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.css';

const url = 'http://localhost:3001/';
const fetchHandler = async ()=>{
  return await axios.get(url).then((res)=>res.data);
};

const Booklist = (props) => {
  const [books, setBooks] = useState();

  useEffect(() => {
    fetchHandler().then((data)=>{
        setBooks(data.books);
    });
  }, []);

  return (
    <div className='container bookList'>
        <h3 className='text-center my-3'>Books List</h3>
        <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
            {
              books&&books.map((book)=>{
                return (
                <Book book={book} key={book.title} deleteBook={props.deleteBook} editBook={props.editBook} getDetails={props.getDetails} srno={books.indexOf(book)+1} />
                )
              })
            }
        </tbody>
        </table>
    </div>
  )
}

export default Booklist