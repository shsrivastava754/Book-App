import React, { useState } from 'react'
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const Book = (props) => {
  const [bookId, setBookId] = useState("");
  const [openDialog, handleDisplay] = React.useState(false);
  const navigate = useNavigate();
    
  const handleClose = () => {
      handleDisplay(false);
  };
  
  const openDialogBox = () => {
      handleDisplay(true);
  };

  // Function for editing book details
  const editBook = (book)=>{
    navigate(`/books/${book._id}`,{state:{name:book.title,author: book.author,description: book.description,price: book.price,quantity: book.quantity}});
  };

  // Function for getting book details
  const getDetails = (book)=>{
    navigate(`/${book._id}`);
  };

  const showToast = ()=>{
      toast.success('Added to cart');
  };

  const showerrorToast = ()=>{
      toast.warning('Failed to add to cart');
  };

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
          res = res.data;
          showToast();
      } else{
          showerrorToast();
      }
  });
 }

  // Function for deleting a book
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
        <button className="btn btn-danger mx-2 tooltips" id={props.book._id} onClick = {openDialogBox} >
          <i className="fa-solid fa-trash"></i><span class="tooltiptext">Delete Book</span>
        </button>
        <button className="btn btn-warning mx-2 tooltips" onClick={()=>{editBook(props.book)}}>
          <i className="fa-solid fa-pen-to-square"></i><span class="tooltiptext">Edit Book</span>
        </button>
        <button className="btn btn-primary mx-2 tooltips"  onClick={()=>{addToCart(props.book)}}>
        <i className="fa-solid fa-cart-shopping"></i><span class="tooltiptext">Add to Cart</span>
        </button>
      </td>
      : 
      <td>
        <button className="btn btn-primary mx-2 tooltips"  onClick={()=>{addToCart(props.book)}}>
        <i className="fa-solid fa-cart-shopping"></i><span class="tooltiptext">Add to Cart</span>
        </button>
      </td>
      }
    
    </tr>
    <Dialog onClose = {handleClose} open = {openDialog} className='dialogBox'>
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
    </Dialog>
    
    <ToastContainer/>
    </>
  )
}

export default Book