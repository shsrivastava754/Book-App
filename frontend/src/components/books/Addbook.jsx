import React, { useState } from 'react';
import '../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { postBook } from '../../services/app.services';

/**
 * 
 * @param {Object} props 
 * @returns {React.Component} Add Book component
 */
const AddBook = (props) => {
    
    // States for form fields
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    /**
     * Validating the form
     * @param {Event} e 
     */
    const formSubmit = (e)=>{
        e.preventDefault();

        addBook(title,author,price,description,quantity);
        setTitle("");
        setAuthor("");
        setPrice("");
        setDescription("");
        setQuantity("");
    };

    /**
     * Sending post request to backend for adding book
     * @param {String} title 
     * @param {String} author 
     * @param {Number} price 
     * @param {String} description 
     * @param {Number} quantity 
     */
    const addBook = async(title,author,price,description,quantity)=>{
        const res = await postBook(title,author,price,description,quantity);
        if(res){
            navigate('/books');
        } else {
            console.log("Some error in adding book");
        }
    }

    const checkToEnable = ()=>{
        if(!title || !author || !description || !price || !quantity){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const checkTitle = (e)=>{
        setTitle(e.target.value);
        checkToEnable();
    }

    const checkAuthor = (e)=>{
        setAuthor(e.target.value);
        checkToEnable();
    }

    const checkPrice = (e)=>{
        setPrice(e.target.value);
        checkToEnable();
    }

    const checkQuantity = (e)=>{
        setQuantity(e.target.value);
        checkToEnable();
    }

    const checkDescription = (e)=>{
        setDescription(e.target.value);
        checkToEnable();
    }

  return (
    <div className='container mt-4 formContainer p-4 donationForm'>
        <h3 className='text-center'>Donate a Book</h3>
        <form onSubmit={formSubmit} autoComplete="off">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={title} className="form-control" id="title" onChange={checkTitle} />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" value={author} className="form-control" id="author" onChange={checkAuthor} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" value={price} className="form-control" id="price" onChange={checkPrice} min={1} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Quantity</label>
                <input type="number" value={quantity} className="form-control" id="quantity" onChange={checkQuantity} min={1} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" value={description} className="form-control" id="description" onChange={checkDescription} />
            </div>
            <button className="btn p-2" disabled={disabled}>Add Book</button>
        </form>
    </div>
  )
}

export default AddBook;