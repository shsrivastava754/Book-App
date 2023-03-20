import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
    const history = useNavigate();

    const [title, settitle] = useState("");
    const [author, setauthor] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("");

    const formSubmit = (e)=>{
        e.preventDefault();

        if(!title || !author || !price || !description || !status){
            alert("All fields are mandatory");
        }

        else{
            addBook(title,author,price,description,status).then(()=>history('/'));
            settitle("");
            setauthor("");
            setprice("");
            setdescription("");
            setstatus("");
        }

    };

    const addBook = async(title,author,price,description,status)=>{
        await axios.post('http://localhost:3001/',{
            title: title,
            author: author,
            price: price,
            description: description,
            status: status
        }).then((res)=>res.data);
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
                <label htmlFor="price" className="form-label">Status</label>
                <select className="form-select" id="status" onChange={(e)=>{setstatus(e.target.value)}} >
                    <option value="1">Available</option>
                    <option value="2">Sold</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" value={description} className="form-control" id="description" onChange={(e)=>{setdescription(e.target.value)}} />
            </div>
            <button className="btn p-2">Add Book</button>
        </form>
    </div>
  )
}

export default Form;