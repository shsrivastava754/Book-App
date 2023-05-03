import axios from "axios";
import { useEffect, useState, React } from "react";
import CartItem from "./CartItem";
import "../../styles/style.scss";
import { checkoutService, clearCartService } from "../../services/cart.service";

const url = `${process.env.REACT_APP_API_URL}/cart/getCartItems`;

/**
 *
 * @returns response after fetching the cart items
 */
const fetchHandler = async () => {
  return await axios
    .post(url, {
      id: JSON.parse(localStorage.getItem("user"))._id,
    })
    .then((res) => res.data);
};

/**
 *
 * @returns {React.Component} Cart component
 */
const Cart = () => {
  // State variable for items in the cart of user
  const [items, setItems] = useState();

  // Total price of the cart
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchHandler().then((data) => {
      setItems(data.items);
      setTotalPrice(data.totalPrice);
    });
  }, []);

  /**
   * Sending backend API request to clear the cart
   */
  const clearCart = () => {
    clearCartService();
  };

  const checkout = () => {
    checkoutService();
  };

  // Passed as a prop to update the total price
  const handleUpdateQuantity = (price) => {
    setTotalPrice(totalPrice + price);
  };

  return (
    <>
      <div className="container bookList">
        <h3 className="my-3">Your Cart</h3>
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
            <div className="components">
              <button className="btn clearCart" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
            <div className="cartTotal">Cart total: Rs. {totalPrice}</div>
            <button className="checkout" onClick={checkout}>
              Proceed to checkout <i className="fa-regular fa-credit-card"></i>
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
