import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/style.scss';

import BookService from '../../services/book.service';

import Header from '../common/Header';

import 'react-toastify/dist/ReactToastify.css';

/**
 * 
 * @param {Object} props 
 * @returns {React.Component} Add Book component
 */
const Address = () => {
    
    // States for form fields
    const [house, setHouse] = useState("");
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");
    const [disabled, setDisabled] = useState(true);


    const navigate = useNavigate();

    /**
     * Validating the form
     * @param {Event} e 
     */
    const formSubmit = (e)=>{
        e.preventDefault();

        // addBook(house,locality,city,state,pin);
        setHouse("");
        setLocality("");
        setCity("");
        setState("");
        setPin("");
    };

    const checkToEnable = ()=>{
        if(!house || !locality || !state || !city || !pin){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const checkHouse = (e)=>{
        setHouse(e.target.value);
        checkToEnable();
    }

    const checkCity = (e)=>{
        setCity(e.target.value);
        checkToEnable();
    }

    const checkLocality = (e)=>{
        setLocality(e.target.value);
        checkToEnable();
    }

    const checkPin = (e)=>{
        setPin(e.target.value);
        checkToEnable();
    }

    const checkState = (e)=>{
        setState(e.target.value);
        checkToEnable();
    }

  return (
    <>
    <Header></Header>
    <div className='container mt-4 formContainer p-4 donationForm'>
        <div className="btn-group">
            <button className="back-btn" style={{paddingBottom:"30px"}} onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
            <h3>Your Address</h3>
        </div>
        <form onSubmit={formSubmit} autoComplete="off">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="title" className="form-label">House No.</label>
                    <input type="text" value={house} className="form-control" id="title" onChange={checkHouse} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="author" className="form-label">Locality</label>
                    <input type="text" value={locality} className="form-control" id="author" onChange={checkLocality} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">City</label>
                    <input type="number" value={city} className="form-control" id="price" onChange={checkCity} min={1} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="sale_price" className="form-label">State</label>
                    <input type="number" value={state} className="form-control" id="sale_price" onChange={checkState} min={1} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">PIN Code</label>
                    <input type="number" value={pin} className="form-control" id="quantity" onChange={checkPin} min={1} />
                </div>
            </div>
            <div className="btnGroup" style={{display:"flex",justifyContent:"center"}}>
                <button className="btn p-2 mx-2" disabled={disabled} type='submit'>Save Address</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Address;