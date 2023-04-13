import React from 'react'
import '../style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartItem = (props) => {
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))._id;

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

  const removeItem = (item)=>{
    axios.delete(`http://localhost:3001/cart/${item._id}/${userId}`).then(()=>navigate("/books/cart"));
    window.location.reload();
  }

  return (
    <>
    
    <tr>
      <td>{props.item.title}</td>
      <td>{props.item.author}</td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
      <td>
        <button className='btn btn-danger tooltips' id={props.item._id} onClick={()=>{confirmDelete(props.item._id)}}>
        <i className="fa-solid fa-trash"></i><span class="tooltiptext">Remove Item</span>
        </button>
      </td>
    </tr>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <i class="fa-regular fa-circle-xmark"></i>
        <p className='text-center'>Confirm Delete?</p>
        <div className="buttons">
          <button className='btnConfirmYes' onClick={()=>{removeItem(props.item)}}>Ok</button>
          <button className='btnConfirmNo'>Cancel</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default CartItem;