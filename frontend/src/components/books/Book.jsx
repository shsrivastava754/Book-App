import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "../../styles/style.scss";
import { compareQuantity } from "../../services/book.service";
import { postToCart, deleteCartItem } from "../../services/cart.service";

const Book = (props) => {
  // State variables for dialog box of confirm delete
  const [openDialog, handleDisplay] = useState(false);

  // State variable for setting cart button disable and enable
  const [disabled, setDisabled] = useState(false);

  // User details
  const [user, setUser] = useState("");

  // Check if item can be added to cart or not when the component loads
  useEffect(() => {
    compareBook();
    fetchHandler().then((data) => {
      setUser(data.message);
    });
  });

  const navigate = useNavigate();

  /**
   * Function to fetch data of book from backend
   * @returns {Response} response from the API call at backend for details of the book
   */
  const fetchHandler = async () => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/users/${props.book.donatedById}`)
      .then((res) => res.data);
  };

  /**
   * Function to handle closing of the confirm delete dialog box
   */
  const handleClose = () => {
    handleDisplay(false);
  };

  /**
   * Function to handle opening of the confirm delete dialog box
   */
  const openDialogBox = () => {
    handleDisplay(true);
  };

  /**
   * Tooltip for add to cart button
   * @param {Object} props
   * @returns jsx element for the tooltip of cart button
   */
  const cartTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add to Cart
    </Tooltip>
  );

  /**
   * Tooltip for edit book button
   * @param {Object} props
   * @returns jsx element for the tooltip of edit button
   */
  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit Book
    </Tooltip>
  );

  /**
   * Tooltip for delete book button
   * @param {Object} props
   * @returns jsx element for the tooltip of delete button
   */
  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete Book
    </Tooltip>
  );

  /**
   * Tooltip for donated by table cell
   * @param {Object} props
   * @returns jsx element for the tooltip of user
   */
  const userTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.email}
    </Tooltip>
  );

  /**
   * Tooltip for quantity of book
   * @param {Object} props
   * @returns jsx element for the tooltip of quantity
   */
  const quantityTooltip = (p) => (
    <Tooltip id="button-tooltip" {...p}>
      In stock: {props.book.quantity}
    </Tooltip>
  );

  /**
   * Function to navigate to a route which shows a form for edit book
   * @param {Object} book
   */
  const editBook = (book) => {
    navigate(`/books/${book._id}`, {
      state: {
        name: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        quantity: book.quantity,
        sale_price: book.sale_price,
      },
    });
  };

  /**
   * Function to navigate to a route which shows details of user with given ID
   * @param {Object} user
   */
  const userDetails = (id) => {
    navigate(`/profile/${id}`);
  };

  /**
   * Function to navigate to a route which shows details of book with given ID
   * @param {Object} book
   */
  const getDetails = (book) => {
    navigate(`/${book._id}`);
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
   * Function for deleting a book
   */
  const deleteBook = () => {
    deleteCartItem(props.book._id);
  };

  /**
   * Check if item can be added to cart
   * @returns {Boolean} whether book quantity is greater than the book in cart
   */
  const compareBook = async () => {
    const result = await compareQuantity(
      JSON.parse(localStorage.getItem("user"))._id,
      props.book._id
    );

    if (result && props.book.quantity > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    return result;
  };

  return (
    <>
      <tr>
        <td onClick={() => {getDetails(props.book)}}>
          {props.book.title}
        </td>
        <td onClick={() => {getDetails(props.book)}}>
          {props.book.author}
        </td>
        <td onClick={() => {getDetails(props.book)}}>
          Rs. {props.book.price}
        </td>
        <td onClick={() => {getDetails(props.book)}}>
          Rs. {props.book.sale_price}
        </td>
        <td onClick={() => {userDetails(user._id)}}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 10 }}
            overlay={userTooltip}
          >
            <div>{user.name}</div>
          </OverlayTrigger>
        </td>
        <td onClick={() => {getDetails(props.book)}}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 150, hide: 10 }}
            overlay={quantityTooltip}
          >
            {props.book.quantity > 0 ? (
              <span className="statusAvailable">Available</span>
            ) : (
              <span className="statusSold">Sold</span>
            )}
          </OverlayTrigger>
        </td>

        {JSON.parse(localStorage.getItem("user"))["role"] === "Admin" ? (
          <td>
            <OverlayTrigger
              placement="left"
              delay={{ show: 150, hide: 10 }}
              overlay={deleteTooltip}
            >
              <button
                className="btn btnAction mx-2"
                id={props.book._id}
                onClick={deleteBook}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              delay={{ show: 150, hide: 10 }}
              overlay={editTooltip}
            >
              <button
                className="btn btnAction mx-2"
                onClick={() => {
                  editBook(props.book);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              delay={{ show: 150, hide: 10 }}
              overlay={cartTooltip}
            >
              <button
                className="btn btnAction mx-2"
                onClick={() => {
                  addToCart(props.book);
                }}
                disabled={disabled}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </OverlayTrigger>
          </td>
        ) : (
          <td>
            <OverlayTrigger
              placement="left"
              delay={{ show: 150, hide: 10 }}
              overlay={cartTooltip}
            >
              <button
                className="btn btnAction mx-2"
                onClick={() => {
                  addToCart(props.book);
                }}
                disabled={disabled}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </OverlayTrigger>
          </td>
        )}
      </tr>
      {/* <Dialog onClose = {handleClose} open = {openDialog} className='dialogBox'>
      <h3 >
              Are you sure to delete the book?
      </h3>
      <div className='buttons'>
          <button onClick = {deleteBook} className='btnConfirmYes'>
              Confirm
          </button>
          <button  onClick = {handleClose} className='btnConfirmNo'>
              Cancel
          </button>
      </div>
    </Dialog> */}

      <ToastContainer />
    </>
  );
};

export default Book;
