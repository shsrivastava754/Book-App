import { useState, useEffect, React } from "react";

import Header from "../common/Header";

import "../../styles/style.scss";

import { getUsers, fetchUsers } from "../../services/user.service";

import User from "./User";

/**
 *
 * @returns {React.Component} Users list component
 */
const Users = () => {
  // State variable for users list
  const [users, setUsers] = useState();

  const [usersLength, setUsersLength] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageNumbers = [];

  useEffect(() => {
    getUsers(page, rowsPerPage, search);
  }, [page, rowsPerPage, search]);

  const getUsers = async (page, rowsPerPage, search) => {
    const response = await fetchUsers(page, rowsPerPage, search);
    setUsers(response.users);
    setUsersLength(response.usersCount);
  };

  // Set page numbers for number of buttons
  for (let i = 1; i <= Math.ceil(usersLength / rowsPerPage); i++) {
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
    if (page !== Math.ceil(usersLength / rowsPerPage)) setPage(page + 1);
  };

  /**
   * Function to manage search box
   * @param {Event} e
   */
  const searchBook = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  /**
   * Sends API call at backend for number of rows per page
   * @param {Number} e
   */
  const handlePageSize = (e) => {
    setRowsPerPage(e.target.value);
    setPage(1);
  };

  /**
   * Sends API call at backend for page number of data
   * @param {Number} number
   */
  const paginate = (number) => {
    setPage(number);
  };

  return (
    <>
      <Header></Header>
      <div className="container bookList">
        <div className="table-heading">
          <div className="left-heading">
            <h3 className="my-3 heading">Users</h3>
          </div>
        </div>
        <div className="components">
          <input
            className="searchBar"
            placeholder="Search user..."
            onChange={searchBook}
          />
        </div>
        <div className="booksTable">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Number of donations</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return <User user={user} key={user._id} />;
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

export default Users;
