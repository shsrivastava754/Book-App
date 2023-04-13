import React, { useState } from 'react'
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Book = (props) => {
  const navigate = useNavigate();

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

  const confirmDelete = (id)=>{
    console.log(id);
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById(id);

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    let deny = document.getElementsByClassName("btnConfirmNo")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks on "No", close the modal
    deny.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }

  // Function for deleting a book
  const deleteBook = ()=>{
    console.log("Current id:",props.book._id);
    // axios.delete(`http://localhost:3001/${props.book._id}`).then(()=>navigate("/books"));
    // window.location.reload();
  };

  return (
    <>
    <tr>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.title}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.author}{props.book._id}</td>
      <td onClick={()=>{getDetails(props.book)}}>Rs. {props.book.price}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.donatedByEmail}</td>
      <td onClick={()=>{getDetails(props.book)}}>
        {
          (props.book.status==="available" || String(props.book.status)==='1')? <span className='statusAvailable'>Available</span>: (props.book.status==="sold" || String(props.book.status)==='2') ? <span className='statusSold'>Sold</span> : <span className='statusRtp'>Ready to Pick</span>
        }
      </td>

      {JSON.parse(localStorage.getItem("user"))["role"]==='Admin'?
      <td>
        {/* <button className="btn btn-danger mx-2 tooltips" id={props.book._id} onClick={()=>{confirmDelete(props.book._id)}} > */}
        <button className="btn btn-danger mx-2 tooltips" id={props.book._id} onClick={()=>{confirmDelete(props.book._id)}} >
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
    
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <i class="fa-regular fa-circle-xmark"></i>
        <p className='text-center'>Confirm Delete?</p>
        <div className="buttons">
          <button className='btnConfirmYes' onClick={()=>{deleteBook()}}>Ok</button>
          <button className='btnConfirmNo'>Cancel</button>
        </div>
      </div>
    </div>
    </tr>
    
    <ToastContainer/>
    </>
  )
}

export default Book