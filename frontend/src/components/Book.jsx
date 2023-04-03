import React from 'react'
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const confirmDelete = (id)=>{
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
  const deleteBook = (book)=>{
    console.log("Delete called");
    axios.delete(`http://localhost:3001/${book._id}`).then(()=>navigate("/books"));
    window.location.reload();
  };

  return (
    <>
    <tr>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.title}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.author}</td>
      <td onClick={()=>{getDetails(props.book)}}>Rs. {props.book.price}</td>
      <td onClick={()=>{getDetails(props.book)}}>{props.book.donatedBy}</td>
      <td onClick={()=>{getDetails(props.book)}}>
        {
          (props.book.status==="available" || String(props.book.status)==='1')? <span className='statusAvailable'>Available</span>: <span className='statusSold'>Sold</span>
        }
      </td>

      {JSON.parse(localStorage.getItem("user"))["role"]==='Admin'?
      <td>
        <button className="btn btn-danger mx-2 tooltips" id={props.book._id} onClick={()=>{confirmDelete(props.book._id)}} >
          <i className="fa-solid fa-trash"></i><span class="tooltiptext">Delete Book</span>
        </button>
        <button className="btn btn-warning mx-2 tooltips" onClick={()=>{editBook(props.book)}}>
          <i className="fa-solid fa-pen-to-square"></i><span class="tooltiptext">Edit Book</span>
        </button>
        {/* <button className="btn btn-primary mx-2 tooltips"  onClick={()=>{getDetails(props.book)}}>
          <i className="fa-solid fa-circle-info"></i><span class="tooltiptext">View Details</span>
        </button> */}
      </td>
      : null}
    </tr>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <i class="fa-regular fa-circle-xmark"></i>
        <p className='text-center'>Confirm Delete?</p>
        <div className="buttons">
          <button className='btnConfirmYes' onClick={()=>{deleteBook(props.book)}}>Ok</button>
          <button className='btnConfirmNo'>Cancel</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Book