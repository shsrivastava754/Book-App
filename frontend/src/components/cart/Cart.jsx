import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';

const url = 'http://localhost:3001/users/returnCartItems';
const fetchHandler = async ()=>{
    return await axios.post(url,{
        id: JSON.parse(localStorage.getItem("user"))._id
    }).then((res)=>res.data);

  return await axios.get(url).then((res)=>res.data);
};

const Cart = () => {
    const [items, setItems] = useState();
    let total = 0;
    useEffect(() => {
        fetchHandler().then((data)=>{
            setItems(data.items);
        });
      }, []);
  return (
    <>
        <div className='container bookList'>
            <h3 className='text-center my-3'>Your Cart</h3>
            <div className="components">
                <Link to='/addBook'><button className='btn btn-success btnAdd'>Donate a Book</button></Link>
            </div>
            <table className="table table-borderless table-responsive booksTable">
            <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope='col'>Quantity</th>
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
            <div className='cartTotal'>Cart total: {total}</div>
        </div>
    </>
  )
}

export default Cart