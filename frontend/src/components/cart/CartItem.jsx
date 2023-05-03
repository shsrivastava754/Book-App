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

  const [incrementDisabled, setIncrementDisabled] = React.useState(false);
  const [decrementDisabled, setDecrementDisabled] = React.useState(false);

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
   * Increments the quantity of item in the cart
   */
  const increment = async () => {
    let result = await incrementQuantity(props.item._id);
    setQuantity(result.data.quantity);
    props.onUpdateQuantity(result.data.sale_price);
  };

  /**
   * Decrements the quantity of item in the cart
   */
  const decrement = async () => {
    let result = await decrementQuantity(props.item._id);
    setQuantity(result.data.quantity);
    props.onUpdateQuantity(-result.data.sale_price);
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
