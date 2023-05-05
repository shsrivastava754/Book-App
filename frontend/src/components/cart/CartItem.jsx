import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect } from "react";
// import Dialog from "@mui/material/Dialog";

import "../../styles/style.scss";
import {
  removeCartItem,
  incrementQuantity,
  decrementQuantity,
  getQuantities
} from "../../services/cart.service";

/**
 *
 * @param {Object} props
 * @returns {React.Component} Single Cart Item
 */
const CartItem = (props) => {
  // State variable for handling the confirm delete dialog box
  const [openDialog, handleDisplay] = React.useState(false);

  // State variable for handling quantity of item
  const [quantity, setQuantity] = React.useState(props.item.quantity);

  // Disabling the increment and decrement buttons on boundary cases
  const [incrementDisabled, setIncrementDisabled] = React.useState(false);
  const [decrementDisabled, setDecrementDisabled] = React.useState(false);

  useEffect(() => {
    // Disable the decrement button for quantity if the quantity is already zero
    quantity===1?setDecrementDisabled(true):setDecrementDisabled(false);

    // Disable the increment button for quantity if the quantity is maximum
    const checkMaximum = async()=>{
      const data = await fetchHandler();
        if(data.cartQuantity === data.bookQuantity){
          setIncrementDisabled(true);
        }
    }

    checkMaximum();
  }, [])
  
  const fetchHandler = async()=>{
    let data = await getQuantities(props.item._id,props.item.bookId);
    return data.data;
  }

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  /**
   * Function to remove an item from the cart
   */
  const removeItem = () => {
    removeCartItem(props.item._id, userId);
  };

  /**
   * Handle closing of the confirm delete dialog box
   */
  const handleClose = () => {
    handleDisplay(false);
  };

  /**
   * Handle opening of the confirm delete dialog box
   */
  const openDialogBox = () => {
    handleDisplay(true);
  };

  /**
   * Function to check if the quantity of the item in cart is maximum or not
   * And Disable the increment button if it is so
   */
  const maxQuantity = async () => {
    try {
      const data = await fetchHandler();
      if(data.cartQuantity+1 === data.bookQuantity){
        setIncrementDisabled(true);
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Increments the quantity of item in the cart
   */
  const increment = async () => {
    // If the quantity of item is 0 then if the user clicks plus button, then minus button should be enabled
    setDecrementDisabled(false);
    if (maxQuantity()) {
      let result = await incrementQuantity(props.item._id);
      setQuantity(result.data.quantity);
      props.onUpdateQuantity(result.data.sale_price);
    }
  };

  /**
   * Decrements the quantity of item in the cart
   */
  const decrement = async () => {
    // If the quantity of item is max then if the user clicks minus button, then plus button should be enabled
    setIncrementDisabled(false);

    let result = await decrementQuantity(props.item._id);
    if(result.data.quantity<=1){
      setDecrementDisabled(true);
      setQuantity(result.data.quantity);
      props.onUpdateQuantity(-result.data.sale_price);
    } else {
      setQuantity(result.data.quantity);
      props.onUpdateQuantity(-result.data.sale_price);
      setDecrementDisabled(false);
    }
  };

  /**
   * Tooltip for quantity of book
   * @param {Object} props
   * @returns jsx element for the tooltip of quantity
   */
  const deleteTooltip = (p) => (
    <Tooltip id="button-tooltip" {...p}>
      Remove Book
    </Tooltip>
  );

  return (
    <>
      <tr>
        <td>{props.item.title}</td>
        <td>{props.item.author}</td>
        <td>Rs. {props.item.price}</td>
        <td>Rs. {props.item.sale_price}</td>
        <td>
          <button
            onClick={decrement}
            disabled={decrementDisabled}
            className="btnQuantityControl mx-3"
          >
            -
          </button>
          {quantity}
          <button
            onClick={increment}
            disabled={incrementDisabled}
            className="btnQuantityControl mx-3"
          >
            +
          </button>
        </td>
        <td>
          <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 10 }}
            overlay={deleteTooltip}
          >
            <button
              className="btn btnAction"
              id={props.item._id}
              onClick={removeItem}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </OverlayTrigger>
        </td>
      </tr>
      {/* <Dialog onClose = {handleClose} open = {openDialog} className='dialogBox'>
      <h3>
              Are you sure to remove the item?
      </h3>
      <br></br>
      <div className='buttons'>
          <button onClick = {removeItem} className='btnConfirmYes'>
              Confirm
          </button>
          <button onClick = {handleClose} className='btnConfirmNo'>
              Cancel
          </button>
      </div>
    </Dialog> */}
    </>
  );
};

export default CartItem;
