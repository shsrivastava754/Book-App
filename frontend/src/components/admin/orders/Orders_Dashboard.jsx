import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserService from '../../../services/user.service';

import Header from '../../common/Header';
import Order from './Order';

const Orders_Dashboard = () => {
    const [orders, setOrders] = useState();

    const [ordersLength, setOrdersLength] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageNumbers = [];
    
    const navigate = useNavigate();

    useEffect(() => {
        (async ()=>{
            const response = await getOrders(page, rowsPerPage, search);
            setOrders(response.data.orders);
            setOrdersLength(response.data.ordersCount);
          })();
    }, [page, rowsPerPage, search]);

    const getOrders = async (page, rowsPerPage, search) => {
      const response = await UserService.fetchAllOrders(page, rowsPerPage, search);
      return response;
    };
    
    // Set page numbers for number of buttons
  for (let i = 1; i <= Math.ceil(ordersLength / rowsPerPage); i++) {
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
    if (page !== Math.ceil(ordersLength / rowsPerPage)) setPage(page + 1);
  };

  /**
   * Function to manage search box
   * @param {Event} e
   */
  const searchOrder = (e) => {
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
        <div className="btn-group mt-2">
            <button className="back-btn" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
          <h3 className="my-3">Customers Orders</h3>
        </div>
        <div className="components">
          <input
            className="searchBar"
            placeholder="Search order..."
            onChange={searchOrder}
          />
        </div>
        <div className="booksTable">
          <table>
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Email</th>
                <th scope="col">Order Date</th>
                <th scope="col">Price</th>
                <th scope="col">Order Status</th>
              </tr>
            </thead>
            <tbody>
            {
            orders && orders.map((item)=>{
              return (
                <Order order={item}/>
              )
            })
            }
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
  )
}

export default Orders_Dashboard;