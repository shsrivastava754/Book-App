import React, { useEffect, useState } from 'react';
import { fetchDonations } from '../../services/user.service';
import Donation from './Donation';
import Header from '../common/Header';

const Donations = () => {
    const [donations, setDonations] = useState();

    useEffect(() => {
        (async ()=>{
            const response = await getDonations();
            setDonations(response.data.donations);
          })();
    }, []);

    const getDonations = async () => {
        const response = await fetchDonations();
        return response;
      };
    
  
    return (
    <>
    <Header></Header>
      <div className="container bookList">
        <div className="table-heading">
          <div className="left-heading">
            <h3 className="my-3 heading">Your Donations</h3>
          </div>
        </div>
        <div className="booksTable">
          <table>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
            {
            donations && donations.map((item)=>{
                return (
                    <Donation donation={item}/>
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

export default Donations;