import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const books = [
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale2",
      parentId: "123",
      campaignType: "Inapp",
      status: "Failed",
      channel: "iOS",
      action: ":"
    },
    {
      name: "Sale34",
      parentId: "45",
      campaignType: "Email",
      status: "sent",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Sale",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    },
    {
      name: "Shaan",
      parentId: "12",
      campaignType: "Push",
      status: "Failed",
      channel: "android",
      action: ":"
    }
  ];
  

const tableHead = {
  title: "Title",
  author: "Author",
  price: "Price",
  donatedByEmail: "Donated By",
  status: "Status",
  action: "Actions"
};

const Table = () => {
  const countPerPage = 5;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [books, setBooks] = useState();
  const [collection, setCollection] = React.useState(
    cloneDeep(books?.slice(0, countPerPage))
  );
  const searchData = React.useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        books?.filter(item => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;
  const fetchHandler = async () => {
    return await axios
      .post(url, {
        userId: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((res) => res.data);
  };

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
    fetchHandler().then((data) => {
        setBooks(data.books);
      });

  }, [value]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(books?.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell&&tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection&&collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
    <div className="container bookList">
        <h3 className="text-center my-3">Books List</h3>

      <div class="components">
        <input className="searchBar"
          placeholder="Search here..."
          value={value}
          onChange={e => setValue(e.target.value)}
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
      <table className="table table-borderless table-responsive booksTable">
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={books?.length}
      />
    </div>
    </>
  );
};
export default Table;
