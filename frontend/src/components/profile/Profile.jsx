import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    fetchHandler().then((data)=>{
      setUser(data.message);
    });
  }, []);

  // Getting the id from url parameters
  const id = useParams().id;

  /**
   * Function to fetch data of book from backend
   * @returns {Response} response from the API call at backend for details of the book
   */
  const fetchHandler = async ()=>{
      return await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`).then((res)=>res.data);
  };

  return (
    <>
        <div className='container mt-4 detailsContainer p-4'>
            <h3>User Profile</h3>
            <div className="details">
                <h5><span>Name</span>: {user?.name}</h5>
                <h5><span>Username</span>: {user?.username}</h5>
                <h5><span>Email</span>: {user?.email}</h5>
            </div>
        </div>
    </>
  )
}

export default Profile