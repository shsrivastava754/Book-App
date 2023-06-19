import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import UserService from '../../services/user.service';

import Header from '../common/Header';
import Order from "./Order";

const Orders = () => {
    const [orders, setOrders] = useState();
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        (async ()=>{
            const response = await getOrders(location.state.userId);
            setOrders(response.data.orders);
          })();
    }, []);

    const getOrders = async (id) => {
        const response = await UserService.fetchOrders(id);
        return response;
      };
    
  
    return (
    <>
    <Header></Header>
      <div className="container bookList">
        <div className="btn-group mt-2">
            <button className="back-btn" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
          <h3 className="my-3">Your Orders</h3>
        </div>
        <div className="booksTable">
          <table>
            <thead>
              <tr>
                <th scope="col">Order Date</th>
                <th scope="col">Quantity</th>
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
        {/* <div className="pagination">
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
        </div> */}
      </div>

    </>
  )
}

export default Orders;