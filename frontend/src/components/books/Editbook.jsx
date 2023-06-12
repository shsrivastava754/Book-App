import { useState, React } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { editBookDetails } from "../../services/book.service";
import Header from "../common/Header";

/**
 * Function to return the edit book component
 * @returns {React.Component} edit book form
 */
const EditBook = () => {

  // States for form fields
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [price, setPrice] = useState();
  const [sale_price, setSalePrice] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(location.state.quantity);

  const id = useParams().id;

  /**
   * Validate the edit book form
   * @param {Event} e
   */
  const formSubmit = (e) => {
    e.preventDefault();
    editBook(title, author, price, description, status, quantity, sale_price).then(() => navigate("/books"));
  };

  /**
   * Changes the quantity field if status option is changed
   * @param {Event} e 
   */
  const updateQuantity = (e) => {
    setStatus(e.target.value);
    if (e.target.value == 1) {
      // setDefaultQuantity(1);
      setQuantity(1);
    } else if (e.target.value == 2) {
      // setDefaultQuantity(0);
      setQuantity(0);
    }
  };

  /**
   * Changes the quantity field when quantity field is changed
   * @param {Event} e 
   */
  const manageQuantity = (e)=>{
    if(status==1){
      setQuantity(e.target.value);
    }
  }

  /**
   * Edit Book Details
   * @param {String} title
   * @param {String} author
   * @param {Number} price
   * @param {String} description
   * @param {String} status
   * @param {Number} quantity
   * @param {Number} sale_price
   */
  const editBook = async (title, author, price, description, status, quantity, sale_price) => {
    let res = await editBookDetails(title, author, price, description, status, quantity, id, sale_price);
    console.log(res);
  };

  return (
    <>
      <Header></Header>
      <div className="container mt-4 formContainer p-4">
        <div className="btn-group">
            <button className="back-btn" style={{paddingBottom:"30px"}} onClick={() => navigate("/books")}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
            <h3>Edit Details</h3>
        </div>
        <form onSubmit={formSubmit}>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                defaultValue={location.state.name}
                className="form-control"
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                defaultValue={location.state.author}
                className="form-control"
                id="author"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                defaultValue={location.state.price}
                className="form-control"
                id="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="sale_price" className="form-label">
                Sale Price
              </label>
              <input
                type="number"
                defaultValue={location.state.sale_price}
                className="form-control"
                id="sale_price"
                onChange={(e) => {
                  setSalePrice(e.target.value);
                }}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                className="form-control"
                id="quantity"
                onChange={manageQuantity}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="status"
                onChange={updateQuantity}
              >
                <option value="1">Available</option>
                <option value="2">Sold</option>
              </select>
            </div>
            <div className="col12 mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea type="text" defaultValue={location.state.description} className="form-control" id="description" onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="btnGroup" style={{display:"flex",justifyContent:"center"}}>
            <button className="btn p-2 mx-2" type="submit">Save Book</button>
            <button className="btn p-2 mx-2" onClick={()=>navigate('/books')}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBook;
