import Book from "./Book";
import axios from "axios";
import { useEffect, useState, React } from "react";
import "../../styles/style.css";
import { Link } from "react-router-dom";

/**
 *
 * @returns {React.Component} Book list component
 */

const Booklist = (props) => {
  // State for books list
  const [books, setBooks] = useState();
  const [tableBooks, setTableBooks] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);

  const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;

  // Fetches the data from Server 
  const fetchHandler = async () => {
    return await axios
      .post(url, {
        userId: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((res) => res.data);
  };

  useEffect(() => {
    fetchHandler().then((data) => {
      setBooks(data.books);
      setTableBooks(data.books);
    });
  }, []);

  const indexOfLastRowOfCurrentPage = currentPage * rowPerPage;
  const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPage;
  
  // Show specific part of data
  let currentRows = tableBooks?.slice(
    indexOfFirstRowOfCurrentPage,
    indexOfLastRowOfCurrentPage
  );

  const pageNumbers = [];

  let tableBooksLength;
  if (tableBooks?.length) {
    tableBooksLength = tableBooks?.length;
  }

  // Set page numbers for number of buttons
  for (let i = 1; i <= Math.ceil(tableBooksLength / rowPerPage); i++) {
    pageNumbers.push(i);
  }

  // When page numbers is changed
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Sets the number of rows per page
   * @param {Event} e - Option from the select tag
   */
  const handlePageSize = (e) => {
    setRowPerPage(e.target.value);
    setCurrentPage(1);
  };

  /**
   * When previous button is clicked
   */
  const handlePrevious = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  /**
   * When next button is clicked
   */
  const handleNext = () => {
    if (currentPage !== Math.ceil(books.length / rowPerPage))
      setCurrentPage(currentPage + 1);
  };

  // Function to set different backgrounds in booklist and login page
  function setBackground() {
    const body = document.querySelector("body");
    body.style.background = "#f7f7f7";
  }

  setBackground();

  /**
   * Function to manage search box
   * @param {Event} e
   */
  const searchBook = (e) => {
    // Don't change the original books table, just change the tableBooks data
    setTableBooks(books);

    const arr = [];
    const newData = books?.map((item) => {
      if (item.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr.push(item);
      }
    });
    setTableBooks(arr);
  };

  return (
    <>
      <div className="container bookList">
        <h3 className="text-center my-3">Books List</h3>
        <div className="components">
          <input
            type="text"
            className="searchBar"
            placeholder="Search here..."
            onChange={searchBook}
          />
          <label htmlFor="filterTable mx-2">Filter by:</label>
          <select name="filterTable" id="filterTable">
            <option value="0">No filter</option>
            <option value="1">Available</option>
            <option value="2">Ready to Pick</option>
            <option value="3">Sold</option>
          </select>
          <Link to="/addBook">
            <button className="btn btnAdd">Donate a Book</button>
          </Link>
        </div>
        <select className="form-select" onChange={(e) => handlePageSize(e)}>
          <option>Books to display</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <table className="table table-borderless table-responsive booksTable">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Donated by</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows &&
              currentRows.map((book) => {
                return (
                  <Book
                    book={book}
                    key={book.title}
                    srno={books.indexOf(book) + 1}
                  />
                );
              })}
          </tbody>
        </table>
        <div className="pagination">
          <div className="col-3 col-xm-12 text-start">
            <button
              className="btn btnPaginationActive align-self-start"
              onClick={() => handlePrevious()}
            >
              {" "}
              Previous{" "}
            </button>
          </div>
          <div className="col-6 col-xm-12">
            <ul className="text-center">
              {pageNumbers.map((number) => {
                let btnClass = " btn btnPaginationInactive mx-1";
                if (number === currentPage)
                  btnClass = "btn btnPaginationActive mx-1";
                return (
                  <button
                    className={btnClass}
                    onClick={() => paginate(number)}
                    key={number}
                  >
                    {number}
                  </button>
                );
              })}
            </ul>
          </div>
          <div className="col-3 col-xm-12 text-end">
            <button
              className="btn btnPaginationActive ml-2 align-self-"
              onClick={() => handleNext()}
            >
              {" "}
              Next{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booklist;
