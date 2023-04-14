import Header from "./components/common/Header";
import Booklist from "./components/Booklist";
import Form from "./components/Form";
import BookDetails from "./components/BookDetails";
import EditBook from "./components/EditBook";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import PrivateRoutes from "./routes/PrivateRoutes";
import ProtectLogin from "./routes/ProtectLogin";
import ProtectAdmin from "./routes/ProtectAdmin";
import Users from "./components/admin/Users";
import Cart from "./components/cart/Cart";
import DialogBox from "./components/DialogBox";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState("")
  const [login,setLogin] = useState(false);

  useEffect(() => {
    setValue( localStorage.getItem("user")) ;
  }, [login]);
  
  return (
    <BrowserRouter>
      {value !== null ?<Header setLogin={setLogin}/> : null}
      <Routes>

        {/* Routes that only logged in normal user can access */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/books" element={<Booklist/>} exact />
          <Route path="/addBook" element={<Form/>} exact />
          <Route path="/:id" element={<BookDetails/>} exact />
          <Route path="/books/:id" element={<EditBook/>} exact />
          <Route path="/books/cart" element={<Cart/>} />
        </Route>

      {/* Routes that is accessed by not logged in user */}
        <Route element={<ProtectLogin/>}>
          <Route path="/login" element={<Login setLogin={setLogin} />} exact /> 
          <Route path="/register" element={<Register/>} exact /> 
          <Route path="/" element={<Login setLogin={setLogin} />} exact /> 
        </Route>

      {/* Routes that only admin can access */}
        <Route element={<ProtectAdmin/>}>
          <Route path="/users" element={<Users/>}/>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
