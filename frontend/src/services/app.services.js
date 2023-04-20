import axios from "axios";

/**
 * Function to send request at backend for number of donations
 * @param {String} url 
 * @returns {Number} the number of donations made by a user
 */
export const getDonations = async(url)=>{
    return await axios.get(url).then((res)=>res.data);
}

/**
 * Returns the list of users in collection
 * @param {String} url 
 * @returns {Array} - List of users 
 */
export const getUsers = async(url)=>{
    return await axios.get(url).then((res)=>res.data);
}

/**
 * 
 * @param {String} title 
 * @param {String} author 
 * @param {String} price 
 * @param {String} description 
 * @param {String} quantity 
 */
export const addBook = async(title,author,price,description,quantity)=>{
    await axios.post('http://localhost:3001/',{
        title: title,
        author: author,
        price: price,
        description: description,
        quantity: quantity,
        donatedById: JSON.parse(localStorage.getItem("user"))["_id"]
    })
    .then((res)=>{
        if(res){
            return "done";
        } else{
            return null;
        }
    });
}



