import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import Dialog from "@mui/material/Dialog";

import "../../styles/style.scss";
import { removeCartItem } from "../../services/cart.service";

/**
 *
 * @param {Object} props
 * @returns {React.Component} Single Cart Item
 */
const CartItem = (props) => {
  // State variable for handling the confirm delete dialog box
  const [openDialog, handleDisplay] = React.useState(false);

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
        <td>{props.item.price}</td>
        <td>{props.item.quantity}</td>
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
