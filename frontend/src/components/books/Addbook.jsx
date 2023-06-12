import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/style.scss';

import { postBook } from '../../services/book.service';

import Header from '../common/Header';

import 'react-toastify/dist/ReactToastify.css';

/**
 * 
 * @param {Object} props 
 * @returns {React.Component} Add Book component
 */
const AddBook = () => {
    
    // States for form fields
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [sale_price, setSalePrice] = useState("");
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

        addBook(title,author,price,description,quantity,sale_price);
        setTitle("");
        setAuthor("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setSalePrice("");
    };

    /**
     * Sending post request to backend for adding book
     * @param {String} title 
     * @param {String} author 
     * @param {Number} price 
     * @param {String} description 
     * @param {Number} quantity 
     * @param {Number} sale_price 
     */
    const addBook = async(title,author,price,description,quantity,sale_price)=>{
        const res = await postBook(title,author,price,description,quantity,sale_price);
        if(res){
            navigate('/books');
        } else {
            console.log("Some error in adding book");
        }
    }

    const checkToEnable = ()=>{
        if(!title || !author || !description || !price || !quantity || !sale_price){
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

    const checkSalePrice = (e)=>{
        setSalePrice(e.target.value);
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
    <>
    <Header></Header>
    <div className='container mt-4 formContainer p-4 donationForm'>
        <div className="btn-group">
            <button className="back-btn" style={{paddingBottom:"30px"}} onClick={() => navigate("/books")}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
            <h3>Donate Book</h3>
        </div>
        <form onSubmit={formSubmit} autoComplete="off">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={title} className="form-control" id="title" onChange={checkTitle} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" value={author} className="form-control" id="author" onChange={checkAuthor} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" value={price} className="form-control" id="price" onChange={checkPrice} min={1} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="sale_price" className="form-label">Sale Price</label>
                    <input type="number" value={sale_price} className="form-control" id="sale_price" onChange={checkSalePrice} min={1} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Quantity</label>
                    <input type="number" value={quantity} className="form-control" id="quantity" onChange={checkQuantity} min={1} />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" value={description} className="form-control" id="description" onChange={checkDescription} />
                </div>
            </div>
            <div className="btnGroup" style={{display:"flex",justifyContent:"center"}}>
                <button className="btn p-2 mx-2" disabled={disabled} type='submit'>Donate Book</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default AddBook;