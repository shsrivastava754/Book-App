import React from 'react'
import Book from './Book';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.css';
import {Link} from 'react-router-dom';

const url = 'http://localhost:3001/';
const fetchHandler = async ()=>{
  return await axios.get(url).then((res)=>res.data);
};

const Booklist = (props) => {
  const [books, setBooks] = useState();
  const [tableBooks, setTableBooks] = useState(books);
  const [search, setSearch] = useState();

  const handleFilter = (e)=>{  
    let newBooks;

    if(e.target.value==0){
      newBooks = [...books];
    }

    if(e.target.value==1){
      newBooks = books.filter((book)=>( 
        book.status==="available"
      ));
    }

    if(e.target.value==2){
      newBooks = books.filter((book)=>( 
        book.status==="ready to pick"
      ));

    }

    if(e.target.value==3){
      newBooks = books.filter((book)=>( 
        book.status==="sold"
      ));
    } 
    setTableBooks(newBooks);
  }

  // Function to handle the search bar
  const handleSearch = ()=>{
    if(search==null){
      return books;
    }

    return books.filter((book)=>(     
      book.author.toLowerCase().includes(search.trim()) || book.title.toLowerCase().includes(search.trim())
    ));
  }

  useEffect(() => {
    fetchHandler().then((data)=>{
        setBooks(data.books);
        setTableBooks(data.books);
    });
  }, []);

  return (

    <>
    <div className='container bookList'>
        <h3 className='text-center my-3'>Books List</h3>
        <div className="components">
          <input className='searchBar' placeholder='Search here...' onChange={(e)=>setSearch(e.target.value)} />
          <label htmlFor="filterTable mx-2"style={{color:"#fff"}}>Filter by:</label>
          <select name="filterTable" id="filterTable" onChange={handleFilter}>
            <option value="0">No filter</option>
            <option value="1">Available</option>
            <option value="2">Ready to Pick</option>
            <option value="3">Sold</option>
          </select>
          <Link to='/addBook'><button className='btn btn-success btnAdd'>Donate a Book</button></Link>
        </div>
        <table className="table table-borderless table-responsive booksTable">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope='col'>Donated by</th>
            <th scope="col">Status</th>
            {/* {JSON.parse(localStorage.getItem("user"))["role"]=='Admin'? */}
            <th scope="col">Action</th>
             {/* :null} */}
          </tr>
        </thead>
        <tbody>
            {
              handleSearch()&&handleSearch().map((book)=>{
                return (
                <Book book={book} key={book.title} srno={books.indexOf(book)+1} />
                )
              })
            }
        </tbody>
        </table>
    </div>
    </>
  )
}

export default Booklist