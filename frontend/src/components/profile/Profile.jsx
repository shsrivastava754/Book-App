import { useState, useEffect, React } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import UserService from "../../services/user.service";

import Header from "../common/Header";

import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState();
  const [donations, setDonations] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    (async()=>{
      const data = await UserService.getUserProfile(id);
      setUser(data.message);
      setDonations(data.donationsCount);
      setOrders(data.ordersCount);
    })();
  }, []);

  // Getting the id from url parameters
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const id = location.state.id;

  const userId = JSON.parse(Cookies.get('userToken'))._id;

  /**
   * Function to navigate to a route which shows details of book with given ID
   * @param {Object} book
   */
  const getDonations = () => {
    navigate(`/users/donations/${user.username}`,{
      state: {
        userId
      }
    });
  };

  const editAddress = () => {
    navigate(`/editAddress/${userId}`,{
      state: {
        house: user.address?.house || '',
        city: user.address?.city || '',
        locality: user.address?.locality || '',
        state: user.address?.state || '',
        pin: user.address?.pin || ''
      }
    });
  };

  /**
   * Function to navigate the orders list page
   */
  const getOrders = () =>{
    navigate(`/users/orders/${user.username}`,{
      state: {
        userId
      }
    });
  }

  return (
    <>
      <Header></Header>
      <div className="container profileContainer">
        <div className="btn-group mt-2">
          <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
          </button>
        <h3 className="my-3">User Profile</h3>
        </div>

        <div className="container mt-4 detailsContainer p-4">
          <div className="details">
            <h5>
              <span>Name</span>: {user?.name}
            </h5>
            <h5>
              <span>Username</span>: {user?.username}
            </h5>
            <h5>
              <span>Email</span>: {user?.email}
            </h5>
            <h5>
              <span>Address</span>: {
                user?.address? <>
                  {user.address.house}, {user.address.locality}, {user.address.city}, {user.address.state} ({user.address.pin})
                </> : <>
                <span className="text-danger" style={{fontWeight:"600"}}>No address provided.</span>
                </>
              }
              {
                (JSON.parse(Cookies.get('userToken'))._id===user?._id)? <span onClick={editAddress} className="editIcon"><i class="fa-solid fa-pen-to-square"></i></span> :null
              }
            </h5>
          </div>
        </div>

          <div className="row mt-4 statsContainer">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  {
                    donations>1?
                    <div className="cart-heading card-title">
                      <div className="left-heading">
                        <h5>{donations} donations</h5>
                      </div>
                      {
                        JSON.parse(Cookies.get('userToken'))._id===id?
                        <div className="right-heading" style={{ width: 600 }}>
                          <span className="cartTotal" onClick={()=>getDonations()}>View Donations</span>
                        </div> : null
                      }
                    </div>
                    :
                    <div className="cart-heading card-title">
                      <div className="left-heading">
                        <h5>{donations} donation</h5>
                      </div>
                      {
                        JSON.parse(Cookies.get('userToken'))._id===id?
                        <div className="right-heading" style={{ width: 600 }}>
                          <span className="cartTotal" onClick={()=>getDonations()}>View Donations</span>
                        </div> : null
                      }
                    </div>
                  }
                  {
                    JSON.parse(Cookies.get('userToken'))._id===id?
                  <>  
                    <p className="card-text">
                    Your act of kindness and thoughtfulness is truly inspiring, and we are incredibly grateful for your support.
                    </p>
                  </>:
                  <p className="card-text">
                  Their contribution is truly remarkable and greatly appreciated. With their donation, we can enhance our library and provide more resources to our community.
                  </p>
                  }
                  
                </div>
              </div>
            </div>
            <div className="col-sm-6"  >
              <div className="card">
                <div className="card-body">
                  {
                    orders>1?
                    <div className="cart-heading card-title">
                      <div className="left-heading">
                        <h5>{orders} orders</h5>
                      </div>
                      {
                        JSON.parse(Cookies.get('userToken'))._id===id?
                        <div className="right-heading" style={{ width: 600 }}>
                          <span className="cartTotal" onClick={()=>getOrders()}>View Orders</span>
                        </div> : null
                      }
                      
                    </div>
                    :
                    <div className="cart-heading card-title">
                      <div className="left-heading">
                        <h5>{orders} order</h5>
                      </div>

                      {
                        JSON.parse(Cookies.get('userToken'))._id===id?
                        <div className="right-heading" style={{ width: 600 }}>
                          <span className="cartTotal" onClick={()=>getOrders()}>View Orders</span>
                        </div> : null
                      }
                    </div>
                  }
                  {
                    JSON.parse(Cookies.get('userToken'))._id===id?
                  <>  
                    <p className="card-text">
                    We strive to provide a seamless and enjoyable shopping experience, and we are delighted that you chose our website to fulfill your needs.
                    </p>
                  </>:
                  <p className="card-text">
                   It's always exciting to see our users engaged in exploring new literature and expanding their knowledge.
                  </p>
                  }
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Profile;
