import { useEffect, useState, React } from "react";

import "../../styles/style.scss";

import {
  checkoutService,
  clearCartService,
  getCartItems,
} from "../../services/cart.service";

import Header from "../common/Header";
import CartItem from "./CartItem";
import Spinner from "react-bootstrap/Spinner";

/**
 *
 * @returns {React.Component} Cart component
 */
const Cart = () => {
  // State variable for items in the cart of user
  const [items, setItems] = useState();

  // Total price of the cart
  const [totalPrice, setTotalPrice] = useState(0);

  // For loader after sending request for email
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getCartItems(url);
      setItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    })();
  }, []);

  const url = `${process.env.REACT_APP_API_URL}/cart/getCartItems`;

  /**
   * Sending backend API request to clear the cart
   */
  const clearCart = () => {
    clearCartService();
  };

  const checkout = async () => {
    setLoading(true);
    console.log(await checkoutService(totalPrice));
    setLoading(false);
    clearCartService();
  };

  // Passed as a prop to update the total price
  const handleUpdateQuantity = (price) => {
    setTotalPrice(totalPrice + price);
  };

  return (
    <>
      <Header></Header>
      <div className="container bookList">
        <div className="cart-heading mt-2">
          <div className="left-heading">
            <h3 className="my-3">Your Cart</h3>
          </div>
          <div className="right-heading" style={{ width: 600 }}>
            <span className="cartTotal">Cart total: Rs. {totalPrice}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Sale Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items?.length ? null : (
              <h4
                className="my-4 text-center"
                style={{ marginLeft: "auto", textAlign: "center" }}
              >
                Add some books to the cart
              </h4>
            )}
            {items &&
              items.map((item) => {
                return (
                  <CartItem
                    item={item}
                    key={item.title}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                );
              })}
          </tbody>
        </table>
        {items?.length ? (
          <>
            <div className="components cartBottom">
              {loading ? (
                <button className="btn btn-loader" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Sending...
                </button>
              ) : (
                <>
                  <button className="btn clearCart" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout" onClick={checkout}>
                    Proceed to checkout{" "}
                    <i className="fa-regular fa-credit-card"></i>
                  </button>
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
