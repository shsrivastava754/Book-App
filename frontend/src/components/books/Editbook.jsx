import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import { editBookDetails } from '../../services/app.service';

/**
 * Function to return the edit book component
 * @returns {React.Component} edit book form
 */
const EditBook = () => {
    
    // State for book list
    const [book, setBook] = useState();
    
    // States for form fields
    const [title, setTitle] = useState(book?.title);
    const [author, setAuthor] = useState(book?.author);
    const [price, setPrice] = useState(book?.price);
    const [description, setDescription] = useState(book?.subscription);
    const [status, setStatus] = useState(book?.status);
    const [quantity, setQuantity] = useState(book?.quantity);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        fetchHandler().then((data)=>{
        setBook(data.book);
      });
    }, [])
    
    const id = useParams().id;
    const fetchHandler = async ()=>{
        return await axios.put(`${process.env.REACT_APP_API_URL}/${id}`).then((res)=>res.data);
    };
    
    /**
     * Validate the edit book form
     * @param {Event} e 
     */
    const formSubmit = (e)=>{
        e.preventDefault();
        editBook(title,author,price,description,status,quantity).then(()=>navigate('/books'));
    };

    /**
     * Edit Book Details
     * @param {String} title 
     * @param {String} author 
     * @param {Number} price 
     * @param {String} description 
     * @param {String} status 
     * @param {Number} quantity 
     */
    const editBook = async(title,author,price,description,status,quantity)=>{
        let res = editBookDetails(title,author,price,description,status,quantity,id);
        console.log(res);
    }
    
    return (
    <div className='container mt-4 formContainer p-4'>
        <h3 className='text-center'>Edit Details</h3>
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" defaultValue={location.state.name} className="form-control" id="title" onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" defaultValue={location.state.author} className="form-control" id="author" onChange={(e)=>{setAuthor(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" value={location.state.price} className="form-control" id="price" onChange={(e)=>{setPrice(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" defaultValue={location.state.quantity} className="form-control" id="quantity" onChange={(e)=>{setQuantity(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select className="form-select" id="status" onChange={(e)=>{setStatus(e.target.value)}} >
                    <option value="1">Available</option>
                    <option value="2">Sold</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" defaultValue={location.state.description} className="form-control" id="description" onChange={(e)=>{setDescription(e.target.value)}} />
            </div>
            <button className="btn p-2">Save Book</button>
        </form>
    </div>
  )
}

export default EditBook