import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = (props) => {
    const navigate = useNavigate();

    // States for form fields
    const [title, settitle] = useState("");
    const [author, setauthor] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [quantity, setquantity] = useState("");

    // Validating the form
    const formSubmit = (e)=>{
        e.preventDefault();

        if(!title || !author || !price || !description || !quantity){
            alert("All fields are mandatory");
        }

        else{
            addBook(title,author,price,description,quantity);
            settitle("");
            setauthor("");
            setprice("");
            setdescription("");
            setquantity("");
        }

    };

    const showToast = ()=>{
        toast.success('Added book successfully');
    };

    const showerrorToast = ()=>{
        toast.warning('Failed to add book');
    };

    // Sending post request to backend for adding book
    const addBook = async(title,author,price,description,quantity)=>{
        await axios.post('http://localhost:3001/',{
            title: title,
            author: author,
            price: price,
            description: description,
            quantity: quantity
        // }).then((res)=>res.data);
        })
        // .then(navigate('/books'))
        .then((res)=>{
            if(res){
                res = res.data;
                showToast();
            } else{
                showerrorToast();
            }
        });

    }

  return (
    <div className='container mt-4 formContainer p-4'>
        <h3 className='text-center'>Donate a Book</h3>
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={title} className="form-control" id="title" onChange={(e)=>{settitle(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" value={author} className="form-control" id="author" onChange={(e)=>{setauthor(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" value={price} className="form-control" id="price" onChange={(e)=>{setprice(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Quantity</label>
                <input type="number" value={quantity} className="form-control" id="quantity" onChange={(e)=>{setquantity(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" value={description} className="form-control" id="description" onChange={(e)=>{setdescription(e.target.value)}} />
            </div>
            <button className="btn p-2">Add Book</button>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Form;