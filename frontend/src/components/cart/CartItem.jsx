import React from 'react'
import '../style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const CartItem = (props) => {
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const removeItem = ()=>{
    axios.delete(`http://localhost:3001/cart/${props.item._id}/${userId}`).then(()=>navigate("/books/cart"));
    window.location.reload();
  }

  const [openDialog, handleDisplay] = React.useState(false);
    
  const handleClose = () => {
      handleDisplay(false);
  };
  
  const openDialogBox = () => {
      handleDisplay(true);
  };
  const buttonStyle = {
      width: "10rem",
      fontsize: "1.5rem",
      height: "2rem",
      padding: "5px",
      borderRadius: "10px",
      backgroundColor: "green",
      color: "White",
      border: "2px solid yellow",
  };
  const divStyle = {
      display: "flex",
      felxDirection: "row",
      position: "absolute",
      right: "0px",
      bottom: "0px",
      // padding: "1rem",
  };
  const confirmButtonStyle = {
      width: "5rem",
      height: "1.5rem",
      fontsize: "1rem",
      backgroundColor: "grey",
      color: "black",
      margin: "5px",
      borderRadius: "10px",
      border: "1px solid black",
  };

  return (
    <>
    
    <tr>
      <td>{props.item.title}</td>
      <td>{props.item.author}</td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
      <td>
        <button className='btn btn-danger tooltips' id={props.item._id} onClick={openDialogBox}>
        <i className="fa-solid fa-trash"></i><span class="tooltiptext">Remove Item</span>
        </button>
      </td>
    </tr>
    <Dialog onClose = {handleClose} open = {openDialog}>
      <DialogTitle> Confirm Dialog </DialogTitle>
      <h3 style = {{ marginTop: "-10px", padding: "5px 10px" }}>
              Are you sure to delete the item? {" "}
      </h3>
      <br></br>
      <div style = {divStyle}>
          <button style = {confirmButtonStyle} onClick = {removeItem}>
              Confirm
          </button>
          <button style = {confirmButtonStyle} onClick = {handleClose}>
              Cancel
          </button>
      </div>
    </Dialog>
    </>
  )
}

export default CartItem;