import Book from './Book';
import axios from 'axios';
import { useEffect, useState, React } from 'react';
import '../../styles/style.css';
import {Link} from 'react-router-dom';


/**
 * 
 * @returns {React.Component} Book list component
*/

const Booklist = (props) => {
  // State for books list
  const [books, setBooks] = useState();
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  
  // State for search Text in the search bar
  const [search, setSearch] = useState();
  
  const [larrDisabled, setLarrDisabled] = useState(true);
  const [rarrDisabled, setRarrDisabled] = useState(false);
  
  
  // const url = `${process.env.REACT_APP_API_URL}/books/getPaginatedBooks`;
  const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;
  const fetchHandler = async ()=>{
    return await axios.post(url,{
      userId: JSON.parse(localStorage.getItem("user"))._id
    }).then((res)=>res.data);
  
    // if(page&&limit){
    //   return await axios.get(url,{ params: { page: page, limit: limit }}).then((res)=>res.data);
    // }
  
    // else {
    //   return await axios.get(url);
    // }
  };
  useEffect(() => {
    fetchHandler().then((data)=>{
        setBooks(data.books);
        
        setTotalPages(setTotalNumberPages(data.booksSize));

        // page>totalPages?setPage(1):setPage(page);
    });
  }, [page,limit]);

  /**
   * Function to get the total number of pages
   * @param {Number} size 
   * @returns Total number of pages for books
   */
  const setTotalNumberPages = (size)=>{
    if(size%limit===0){
      return(parseInt(size/limit));
    } else{
      return(parseInt(size/limit +1));
    }
  }

  // Function to set different backgrounds in booklist and login page
  function setBackground() {
    const body = document.querySelector('body');
    body.style.background = '#f7f7f7';
  }

  setBackground();

  // When left arrow is clicked
  const moveLeft = async ()=>{
    setRarrDisabled(false);
    setPage(page-1);

    let currBooks = await axios.get('http://localhost:3001/books/getPaginatedBooks',{ params: { page: page-1, limit: limit }});
    setBooks(currBooks.data.books);

    page-1==1?setLarrDisabled(true):setLarrDisabled(false);
  };

  // When right arrow is clicked
  const moveRight = async ()=>{
    setLarrDisabled(false);
    setPage(page+1);

    let currBooks = await axios.get('http://localhost:3001/books/getPaginatedBooks',{ params: { page: page+1, limit: limit }});
    setBooks(currBooks.data.books);

    page>setTotalNumberPages(totalPages)?setRarrDisabled(true):setRarrDisabled(false);
  };

  // Change the limit of pagination
  const changeLimit = async (e)=>{
    setLimit(e.target.value);

    let currBooks = await axios.get('http://localhost:3001/books/getPaginatedBooks',{ params: { page: page, limit: e.target.value }});
    setBooks(currBooks.data.books);

    setTotalNumberPages(currBooks.length);
  }

  const searchBook = async(e)=>{
    setSearch(e.target.value);

    let currBooks = await axios.get('http://localhost:3001/books/getPaginatedBooks',{ params: { search: e.target.value}});
    console.log(currBooks);
    setBooks(currBooks.data.books);
  }

  return (
    <>
    <div className='container bookList'>
        <h3 className='text-center my-3'>Books List</h3>
        <div className="components">
          <input className='searchBar' placeholder='Search here...' onChange={searchBook} />
          <label htmlFor="filterTable mx-2">Filter by:</label>
          <select name="filterTable" id="filterTable">
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
              books&&books.map((book)=>{
                return (
                <Book book={book} key={book.title} srno={books.indexOf(book)+1} />
                )
              })
            }
        </tbody>
        </table>
        {/* <div className='pagination'>
          <button className='leftArrow' onClick={moveLeft} disabled={larrDisabled}>
            &larr;
          </button>

          <div className='detailsPaginate'>
            {page} of {totalPages} pages
          </div>

          <button className='rightArrow' onClick={moveRight} disabled={rarrDisabled}>
            &rarr;
          </button>

          <select onChange={changeLimit}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div> */}
    </div>
    </>
  )
}

export default Booklist