import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, React } from "react";

import { postToCart } from "../../services/cart.service";
import { compareQuantity, getBookData } from "../../services/book.service";
import Header from "../common/Header";

/**
 * Function to return Book details component
 * @returns {React.Component} Details of book
 */
const BookDetails = () => {
  const [book, setBook] = useState();

  // State variable for setting cart button disable and enable
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async()=>{
      const data = await getBookData(url);
      setBook(data.data.book);
    })();
  }, []);
  
  // Getting the id from url parameters
  const id = useParams().id;
  const url = `${process.env.REACT_APP_API_URL}/:${id}`;
  
  /**
   *
   * @param {Object} book Book to be edited
   */
  const editBook = (book) => {
    navigate(`/books/${book._id}`, {
      state: {
        name: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        quantity: book.quantity,
        sale_price: book.sale_price
      },
    });
  };
  
  /**
   * Function that makes API call to add an item to cart
   * @param {Object} book
   */
  const addToCart = async (book) => {
    if (compareBook()) {
      postToCart(book);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  /**
   * Check if item can be added to cart
   * @returns {Boolean} whether book quantity is greater than the book in cart
   */
  const compareBook = async () => {
    const result = await compareQuantity(
      JSON.parse(localStorage.getItem("user"))._id,
      book?._id
      );
      if (result) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
      
      return result;
    };    

  return (
    <>
      <Header></Header>
      <div className="container mt-4 detailsContainer p-4">
        <h3 className="text-center">Book Details</h3>
        <div className="details">
          <h5>
            <span>Title</span>: {book?.title}
          </h5>
          <h5>
            <span>Author</span>: {book?.author}
          </h5>
          <h5 className="my-3 lh-base">
            <span>Description</span>: {book?.description}
          </h5>
          <h5>
            <span>Status</span>: {book?.status}
          </h5>
          <h5>
            <span>Price</span>: {book?.price}
          </h5>
          {localStorage.getItem("user") ? (
            JSON.parse(localStorage.getItem("user"))["role"] === "Admin" ? (
              <button className="btn" onClick={() => {editBook(book)}} >
                Edit Details
              </button>
            ) : null
          ) : null}
          <button className="btn mt-3" onClick={() => {addToCart(book)}} disabled={disabled}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
