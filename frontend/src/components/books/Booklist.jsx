import { useEffect, useState, React } from "react";
import { Link } from "react-router-dom";

import "../../styles/style.scss";
import Header from "../common/Header";
import Book from "./Book";

import axios from "axios";

/**
 *
 * @returns {React.Component} Book list component
 */

const Booklist = () => {
  // State for books list
  const [books, setBooks] = useState();
  const [booksLength, setBooksLength] = useState();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;

  useEffect(() => {
    getFilteredBooks(page, limit);
  }, [page, limit]);

  /**
   * Sends API request to backend for getting books based on pagination
   * @param {Number} currPage 
   * @param {Number} currLimit 
   */
  const getFilteredBooks = async (currPage = page, currLimit = limit) => {
    const response = await axios.post(url, {
      userId: JSON.parse(localStorage.getItem("user"))._id,
      page: currPage,
      limit: currLimit,
    });
    setBooks(response.data.books);
    setBooksLength(response.data.booksCount);
  };


  const pageNumbers = [];

  // Set page numbers for number of buttons
  for (let i = 1; i <= Math.ceil(booksLength / limit); i++) {
    pageNumbers.push(i);
  }

  /**
   * When previous button is clicked
   */
  const handlePrevious = () => {
    if (page !== 1) setPage(page - 1);
  };

  /**
   * When next button is clicked
   */
  const handleNext = () => {
    if (page !== Math.ceil(booksLength / limit))
      setPage(page + 1);
  };

  // Function to set different backgrounds in booklist and login page
  const setBackground = () => {
    const body = document.querySelector("body");
    body.style.background = "#f7f7f7";
  };

  // const getFilteredBooks = async (currPage = page, currLimit = limit) => {
  //   const response = await axios.post(url, {
  //     userId: JSON.parse(localStorage.getItem("user"))._id,
  //     page: currPage,
  //     limit: currLimit,
  //   });

  //   setBooks(response.data.books);
  //   console.log(response.data.books);
  // };

  setBackground();

  /**
   * Function to manage search box
   * @param {Event} e
   */
  const searchBook = (e) => {
    console.log(e.target.value);
  };

  /**
   * Handles the filter option for status of book
   * @param {Event} e
   */
  const handleFilter = (e) => {
    console.log(e.target.value);
  };

  /**
   * Sends API call at backend for number of rows per page
   * @param {Number} e
   */
  const handlePageSize = (e) => {
    setLimit(e.target.value);
    setPage(1);

    // getFilteredBooks(1, e.target.value);
  };

  /**
   * Sends API call at backend for page number of data
   * @param {Number} number
   */
  const paginate = (number) => {
    setPage(number);
    // getFilteredBooks(number, limit);
  };

  return (
    <>
      <Header></Header>
      <div className="container bookList">
        <div className="table-heading">
          <div className="left-heading">
            <h3 className="my-3 heading">Books</h3>
          </div>
          <div className="right-heading">
            <Link to="/addBook" className="mx-2">
              <button className="btn btnAdd">Donate a Book</button>
            </Link>
            <Link to="/books/requestBook">
              <button className="btn btnAdd">Request a Book</button>
            </Link>
          </div>
        </div>
        <div className="components">
          <input
            type="text"
            className="searchBar"
            placeholder="Search here..."
            onChange={searchBook}
          />
          <label htmlFor="filterTable mx-2">Filter by:</label>
          <select name="filterTable" id="filterTable" onChange={handleFilter}>
            <option value="0">No filter</option>
            <option value="1">Available</option>
            <option value="2">Sold</option>
          </select>
        </div>
        <div className="booksTable">
          <table>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope="col">Sale Price</th>
                <th scope="col">Donated By</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book) => {
                  return <Book book={book} key={book.title} />;
                })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="left-pagination">
            <span htmlFor="rowsPerPage">Rows per page:</span>
            <select
              className="form-select"
              onChange={(e) => handlePageSize(e)}
              id="rowsPerPage"
              style={{ display: "inline" }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="right-pagination">
            <button
              className="btn btnPaginationControls previous"
              onClick={() => handlePrevious()}
            >
              {" "}
              Previous{" "}
            </button>
            <ul className="">
              {pageNumbers.map((number) => {
                let btnClass = " btn btnPaginationInactive mx-1";
                if (number === page) btnClass = "btn btnPaginationActive mx-1";
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
            <button
              className="btn btnPaginationControls float-right"
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
