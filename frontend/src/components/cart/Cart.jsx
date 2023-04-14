import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const url = 'http://localhost:3001/cart/getCartItems';
const fetchHandler = async ()=>{
    return await axios.post(url,{
        id: JSON.parse(localStorage.getItem("user"))._id
    }).then((res)=>res.data);

};


const Cart = () => {
    const [items, setItems] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchHandler().then((data)=>{
            setItems(data.items);
        });
    }, []);
    
    let total = 0;
    const clearCart = ()=>{
        axios.post('http://localhost:3001/cart/clearCart',{
            userId: JSON.parse(localStorage.getItem("user"))._id,
            userEmail: JSON.parse(localStorage.getItem("user")).email
        }).then(()=>navigate("/books"));
        window.location.reload();
    };
  return (
    <>
        <div className='container bookList'>
            <h3 className='text-center my-3'>Your Cart</h3>
            <table className="table table-borderless table-responsive booksTable">
            <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Actions</th>
            </tr>
            </thead>
            <tbody>
                {
                items&&items.map((item)=>{
                    total = total+(item.quantity*item.price);
                    return (
                    <CartItem item={item} key={item.title} />
                    )
                })
                }

            </tbody>
            </table>
            {items?.length?
            <div className="components">
                <button className='clearCart' onClick={clearCart}>Clear Cart</button>
            </div>
            : null    
            }   
            
            <div className='cartTotal'>Cart total: {total}</div>
            <button className='checkout'>Proceed to checkout <i class="fa-regular fa-credit-card"></i></button>
        </div>
    </>
  )
}

export default Cart