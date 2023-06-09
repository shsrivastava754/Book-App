import { useState, React } from "react";
import { useNavigate } from "react-router-dom";

import BookService from "../../services/book.service";

import Header from "../common/Header";

const RequestBook = () => {
  // States for form fields
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  /**
   * Validating the form
   * @param {Event} e
   */
  const formSubmit = (e) => {
    e.preventDefault();

    sendRequest(bookName, author);
    setBookName("");
    setAuthor("");
  };

  /**
   * Sending post request to backend for requesting book
   * @param {String} bookName
   * @param {String} author
   */
  const sendRequest = async (bookName, author) => {
    const res = await BookService.sendRequest(bookName, author);
    if (res) {
      navigate("/books");
    } else {
      console.log("Some error in requesting book");
    }
  };

  const checkToEnable = () => {
    if (!bookName || !author) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const checkBookName = (e) => {
    setBookName(e.target.value);
    checkToEnable();
  };

  const checkAuthor = (e) => {
    setAuthor(e.target.value);
    checkToEnable();
  };

  return (
    <>
      <Header></Header>
      <div className="container mt-4 formContainer p-4 donationForm">
        <div className="btn-group mt-2">
          <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3 className="my-3">Request a Book</h3>
        </div>
        <form onSubmit={formSubmit} autoComplete="off">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                value={bookName}
                className="form-control"
                id="title"
                onChange={checkBookName}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                value={author}
                className="form-control"
                id="author"
                onChange={checkAuthor}
              />
            </div>
          </div>
          <div className="btnGroup" style={{display:"flex",justifyContent:"center"}}>
            <button className="btn p-2 mx-2" disabled={disabled} type="submit">
              Request Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RequestBook;
