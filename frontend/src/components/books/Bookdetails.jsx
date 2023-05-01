import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, React } from "react";
import axios from "axios";
import { postToCart, deleteCartItem } from "../../services/cart.service";
import { compareQuantity } from "../../services/book.service";

/**
 * Function to return Book details component
 * @returns {React.Component} Details of book
 */
const BookDetails = () => {
  const [book, setBook] = useState();

  // State variable for setting cart button disable and enable
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

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
      },
    });
  };

  useEffect(() => {
    fetchHandler().then((data) => {
      setBook(data.book);
    });
  }, []);

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

  // Getting the id from url parameters
  const id = useParams().id;

  /**
   * Function to fetch data of book from backend
   * @returns {Response} response from the API call at backend for details of the book
   */
  const fetchHandler = async () => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/:${id}`)
      .then((res) => res.data);
  };

  return (
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
        <button
          className="btn"
          onClick={() => {
            editBook(book);
          }}
        >
          Edit Details
        </button>
        <button
          className="btn mt-3"
          onClick={() => {
            addToCart(book);
          }}
          disabled={disabled}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
