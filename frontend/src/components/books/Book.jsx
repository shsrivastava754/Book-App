import React, { useState, useEffect } from 'react'
import '../../styles/style.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Dialog from "@mui/material/Dialog";
import { compareQuantity } from '../../services/book.service';
import { postToCart, deleteCartItem } from '../../services/cart.service';

const Book = (props) => {

  // State variables for dialog box of confirm delete
  const [openDialog, handleDisplay] = useState(false);

  // State variable for setting cart button disable and enable
  const [disabled, setDisabled] = useState(false);

  // Check if item can be added to cart or not when the component loads
  useEffect(() => {
    compareBook();
  });
  
  const navigate = useNavigate();
    
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
   * Function to navigate to a route which shows a form for edit book
   * @param {Object} book 
   */
  const editBook = (book)=>{
    navigate(`/books/${book._id}`,{state:{name:book.title,author: book.author,description: book.description,price: book.price,quantity: book.quantity}});
  };

  /**
   * Function to navigate to a route which shows details of book with given ID
   * @param {Object} book 
   */
  const getDetails = (book)=>{
    navigate(`/${book._id}`);
  };

  /**
   * Function that makes API call to add an item to cart
   * @param {Object} book 
   */
  const addToCart = async (book)=>{
    if(compareBook()){
      postToCart(book);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
 }

  /**
   * Function for deleting a book
   */
  const deleteBook = ()=>{
    deleteCartItem(props.book._id);
  };

  /**
   * Check if item can be added to cart
   * @returns {Boolean} whether book quantity is greater than the book in cart
   */
  const compareBook = async ()=>{
    const result = await compareQuantity(JSON.parse(localStorage.getItem("user"))._id,props.book._id);
    if(result){
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    return result;
  }

  return (
    <>
    <tr>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.title}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.author}</td>
      <td onClick={()=>{getDetails(props.book)}}>Rs. {props.book.price}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.donatedByEmail}</td>
      <td onClick={()=>{getDetails(props.book)}}>
        {
          (props.book.quantity>0)? <span className='statusAvailable'>Available</span>: <span className='statusSold'>Sold</span>
          // (props.book.quantity>0 || String(props.book.status)==='1')? <span className='statusAvailable'>Available</span>: (props.book.status==="sold" || String(props.book.status)==='2') ? <span className='statusSold'>Sold</span> : <span className='statusRtp'>Ready to Pick</span>
        }
      </td>

      {JSON.parse(localStorage.getItem("user"))["role"]==='Admin'?
      <td>
        <button className="btn btnAction mx-2 tooltips" id={props.book._id} onClick = {deleteBook} >
          <i className="fa-solid fa-trash"></i><span className="tooltiptext">Delete Book</span>
        </button>
        <button className="btn btnAction mx-2 tooltips" onClick={()=>{editBook(props.book)}}>
          <i className="fa-solid fa-pen-to-square"></i><span className="tooltiptext">Edit Book</span>
        </button>
        <button className="btn btnAction mx-2 tooltips"  onClick={()=>{addToCart(props.book)}} disabled={disabled}>
        <i className="fa-solid fa-cart-shopping"></i><span className="tooltiptext">Add to Cart</span>
        </button>
      </td>
      : 
      <td>
        <button className="btn btnAction mx-2 tooltips"  onClick={()=>{addToCart(props.book)}} disabled={disabled}>
        <i className="fa-solid fa-cart-shopping"></i><span className="tooltiptext">Add to Cart</span>
        </button>
      </td>
      }
    
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
    
    <ToastContainer/>
    </>
  )
}

export default Book