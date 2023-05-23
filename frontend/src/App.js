import { BrowserRouter, Routes, Route } from "react-router-dom";

import Booklist from "./components/books/Booklist";
import AddBook from "./components/books/Addbook";
import Bookdetails from "./components/books/Bookdetails";
import Editbook from "./components/books/Editbook";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Users from "./components/admin/Users";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import RequestBook from "./components/books/RequestBook";

import PrivateRoutes from "./routes/PrivateRoutes";
import ProtectLogin from "./routes/ProtectLogin";
import ProtectAdmin from "./routes/ProtectAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes that only logged in normal user can access */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/books" element={<Booklist/>} exact />
          <Route path="/addBook" element={<AddBook/>} exact />
          <Route path="/:id" element={<Bookdetails/>} exact />
          <Route path="/books/:id" element={<Editbook/>} exact />
          <Route path="/books/cart" element={<Cart/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/books/requestBook" element={<RequestBook/>} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
