import React, { useState } from 'react'
import '../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Dialog from "@mui/material/Dialog";

const Book = (props) => {
  // State variables for dialog box of confirm delete
  const [openDialog, handleDisplay] = useState(false);
  
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
   * Function to show notification in case of adding an item to cart
   */
  const showToast = ()=>{
      toast.success('Added to cart');
  };

  /**
   * Function to show error notification in case of failure in addition to cart 
   */
  const showerrorToast = ()=>{
      toast.warning('Failed to add to cart');
  };

  /**
   * Function that makes API call to add an item to cart
   * @param {Object} book 
   */
  const addToCart = async (book)=>{
    await axios.post('http://localhost:3001/cart/addToCart',{
      title: book.title,
      price: book.price,
      author: book.author,
      userId: JSON.parse(localStorage.getItem("user"))._id,
      userEmail: JSON.parse(localStorage.getItem("user")).email
    })
    .then((res)=>{
      if(res){
          showToast();
      } else{
          showerrorToast();
      }
  });
 }

  /**
   * Function for deleting a book
   */
  const deleteBook = ()=>{
    axios.delete(`http://localhost:3001/${props.book._id}`).then(()=>navigate("/books"));
    window.location.reload();
  };

  return (
    <>
    <tr>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.title}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.author}</td>
      <td onClick={()=>{getDetails(props.book)}}>Rs. {props.book.price}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.donatedByEmail}</td>
      <td onClick={()=>{getDetails(props.book)}}>
        {
          (props.book.status==="available" || String(props.book.status)==='1')? <span className='statusAvailable'>Available</span>: (props.book.status==="sold" || String(props.book.status)==='2') ? <span className='statusSold'>Sold</span> : <span className='statusRtp'>Ready to Pick</span>
        }
      </td>

      {JSON.parse(localStorage.getItem("user"))["role"]==='Admin'?
      <td>
        <button className="btn btnAction mx-2 tooltips" id={props.book._id} onClick = {deleteBook} >
          <i className="fa-solid fa-trash"></i><span class="tooltiptext">Delete Book</span>
        </button>
        <button className="btn btnAction mx-2 tooltips" onClick={()=>{editBook(props.book)}}>
          <i className="fa-solid fa-pen-to-square"></i><span class="tooltiptext">Edit Book</span>
        </button>
        <button className="btn btnAction mx-2 tooltips"  onClick={()=>{addToCart(props.book)}}>
        <i className="fa-solid fa-cart-shopping"></i><span class="tooltiptext">Add to Cart</span>
        </button>
      </td>
      : 
      <td>
        <button className="btn btnAction mx-2 tooltips"  onClick={()=>{addToCart(props.book)}}>
        <i className="fa-solid fa-cart-shopping"></i><span class="tooltiptext">Add to Cart</span>
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