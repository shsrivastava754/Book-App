import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const EditBook = () => {
    const id = useParams().id;
    const navigate = useNavigate();

    const [book, setBook] = useState();

    const fetchHandler = async ()=>{
        return await axios.put(`http://localhost:3001/${id}`).then((res)=>res.data);
    };
    
    useEffect(() => {
      fetchHandler().then((data)=>{
        setBook(data.book);
      });
    }, [])

    // States for form fields
    const [title, settitle] = useState(book?.title);
    const [author, setauthor] = useState(book?.author);
    const [price, setprice] = useState(book?.price);
    const [description, setdescription] = useState(book?.subscription);
    const [status, setstatus] = useState(book?.status);
    const [quantity, setquantity] = useState(book?.quantity);

    // Validate the form
    const formSubmit = (e)=>{
        e.preventDefault();

        // if(!title || !author || !price || !description || !status || !quantity){
        //     alert("All fields are mandatory");
        // }

        // else{
            editBook(title,author,price,description,status,quantity).then(()=>navigate('/'));
            settitle("");
            setauthor("");
            setprice("");
            setdescription("");
            setstatus("");
            setquantity("");
        // }

    };

    // Sending put request to backend 
    const editBook = async(title,author,price,description,status,quantity)=>{

        await axios.put(`http://localhost:3001/${id}`,{
            title: title,
            author: author,
            price: price,
            description: description,
            status: status,
            quantity: quantity
        }).then((res)=>res.data);
    }
    
    const location = useLocation();
    return (
    <div className='container mt-4 formContainer p-4'>
        <h3 className='text-center'>Edit Details</h3>
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" defaultValue={location.state.name} className="form-control" id="title" />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" defaultValue={location.state.author} className="form-control" id="author" onChange={(e)=>{setauthor(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" value={location.state.price} className="form-control" id="price" onChange={(e)=>{setprice(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" defaultValue={location.state.quantity} className="form-control" id="quantity" onChange={(e)=>{setquantity(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select className="form-select" id="status" onChange={(e)=>{setstatus(e.target.value)}} >
                    <option value="1">Available</option>
                    <option value="2">Sold</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" defaultValue={location.state.description} className="form-control" id="description" onChange={(e)=>{setdescription(e.target.value)}} />
            </div>
            <button className="btn p-2">Save Book</button>
        </form>
    </div>
  )
}

export default EditBook