import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookList from "./components/books/BookList";
import AddBook from "./components/books/Addbook";
import Bookdetails from "./components/books/Bookdetails";
import Editbook from "./components/books/Editbook";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Users from "./components/admin/Users";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import RequestBook from "./components/books/RequestBook";
import Donations from "./components/profile/Donations";
import Orders from "./components/profile/Orders";
import Address from "./components/profile/Address";

import PrivateRoutes from "./routes/PrivateRoutes";
import ProtectLogin from "./routes/ProtectLogin";
import ProfileRoutes from "./routes/ProfileRoutes";
import ProtectAdmin from "./routes/ProtectAdmin";
import Orders_Dashboard from "./components/admin/orders/Orders_Dashboard";
import Order_Details from "./components/admin/orders/Order_Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes that only logged in normal user can access */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/books" element={<BookList/>} exact />
          <Route path="/addBook" element={<AddBook/>} exact />
          <Route path="/book/:title" element={<Bookdetails/>} exact />
          <Route path="/books/:id" element={<Editbook/>} exact />
          <Route path="/books/cart" element={<Cart/>} />
          <Route path="/books/requestBook" element={<RequestBook/>} />
          <Route path="/profile/:username" element={<Profile/>} />
          <Route path="/editAddress/:id" element={<Address/>} />
        </Route>

        <Route element={<ProfileRoutes/>}>
          <Route path="/users/donations/:username" element={<Donations/>} />
          <Route path="/users/orders/:username" element={<Orders/>} />
        </Route>

      {/* Routes that is accessed by not logged in user */}
        <Route element={<ProtectLogin/>}>
          <Route path="/login" element={<Login />} exact /> 
          <Route path="/register" element={<Register/>} exact /> 
          <Route path="/" element={<Login />} exact /> 
        </Route>

      {/* Routes that only admin can access */}
        <Route element={<ProtectAdmin/>}>
          <Route path="/users" element={<Users/>} exact/>
          <Route path="/orders" element={<Orders_Dashboard/>} exact/>
          <Route path="/orders/:id" element={<Order_Details/>} exact/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
