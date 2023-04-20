import { useState, useEffect, React } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import User from './User';
import {Link} from 'react-router-dom';

const url = 'http://localhost:3001/users/getUsers';

/**
 * Function to send API request at backend for the users data
 * @returns {Array} list of users 
 */
const fetchHandler = async ()=>{
  return await axios.get(url).then((res)=>res.data);
};

/**
 * 
 * @returns {React.Component} Users list component
 */
const Users = () => {
  // State variable for users list
  const [users, setUsers] = useState();
  
  // State variable for search text
  const [search, setSearch] = useState();
  
  useEffect(() => {
    fetchHandler().then((data)=>{
        setUsers(data.users);
    });
  }, []);

  /**
   * Function to handle the search bar
   * @returns users list according to the search text
   */
  const handleSearch = ()=>{
    if(search==null){
      return users;
    }

    return users.filter((user)=>(     
      user.username.toLowerCase().includes(search.trim())
    ));
  }

  return (
    <>
      <div className='container bookList'>
          <h3 className='text-center my-3'>Users List</h3>
          <div className="components">
            <input className='searchBar' placeholder='Search user...' onChange={(e)=>setSearch(e.target.value)} />
            <Link to='/addBook'><button className='btn btn-success btnAdd'>Donate a Book</button></Link>
          </div>
          <table className="table table-borderless table-responsive usersTable">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope='col'>Username</th>
              <th scope="col">Email</th>
              <th scope="col">Number of donations</th>
            </tr>
          </thead>
          <tbody>
              {
                handleSearch()&&handleSearch().map((user)=>{
                  return (
                  <User user={user} key={user._id} />
                  )
                })
              }
          </tbody>
          </table>
      </div>
    </>
  )
}

export default Users;