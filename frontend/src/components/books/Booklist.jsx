import Book from './Book';
import axios from 'axios';
import { useEffect, useState, React } from 'react';
import '../../styles/style.css';
import {Link} from 'react-router-dom';

const url = 'http://localhost:3001/books/getBooks';

const fetchHandler = async ()=>{
  return await axios.post(url,{
    userId: JSON.parse(localStorage.getItem("user"))._id
  }).then((res)=>res.data);
};

/**
 * 
 * @returns {React.Component} Book list compo 
 */

const Booklist = (props) => {
  // State for books list
  const [books, setBooks] = useState();
  
  // State for books table
  const [tableBooks, setTableBooks] = useState(books);
  
  // State for search Text in the search bar
  const [search, setSearch] = useState();
  
  // 
  useEffect(() => {
    fetchHandler().then((data)=>{
        setBooks(data.books);
        setTableBooks(data.books);
    });
  }, []);
  
  /**
   * Function to handle the table according to filter applied from dropdown
   * @param {Event} e 
   */
  const handleFilter = (e)=>{  
    let newBooks;

    if(e.target.value===0){
      newBooks = [...books];
    }

    if(e.target.value===1){
      newBooks = books.filter((book)=>( 
        book.status==="available"
      ));
    }

    if(e.target.value===2){
      newBooks = books.filter((book)=>( 
        book.status==="Ready to pick"
      ));

    }

    if(e.target.value===3){
      newBooks = books.filter((book)=>( 
        book.status==="sold"
      ));
    } 
    setTableBooks(newBooks);
  }

  /**
   * Function to handle the search functionality
   * @returns books list based on the search value
   */
  const handleSearch = ()=>{
    if(search==null){
      return books;
    }

    return books.filter((book)=>(     
      book.author.toLowerCase().includes(search.trim()) || book.title.toLowerCase().includes(search.trim())
    ));
  }

  function setBackground() {
    const body = document.querySelector('body');
    body.style.background = '#f7f7f7';
  }

  setBackground();

  return (

    <>
    <div className='container bookList'>
        <h3 className='text-center my-3'>Books List</h3>
        <div className="components">
          <input className='searchBar' placeholder='Search here...' onChange={(e)=>setSearch(e.target.value)} />
          <label htmlFor="filterTable mx-2">Filter by:</label>
          <select name="filterTable" id="filterTable" onChange={handleFilter}>
            <option value="0">No filter</option>
            <option value="1">Available</option>
            <option value="2">Ready to Pick</option>
            <option value="3">Sold</option>
          </select>
          <Link to='/addBook'><button className='btn btnAdd'>Donate a Book</button></Link>
        </div>
        <table className="table table-borderless table-responsive booksTable">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope='col'>Donated by</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
            {
              tableBooks&&tableBooks.map((book)=>{
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