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
import Footer from "./components/common/Footer";
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
        <Route element={<PrivateRoutes/>}>
          <Route path="/books" element={<Booklist/>} exact />
          <Route path="/addBook" element={<Form/>} exact />
          <Route path="/:id" element={<BookDetails/>} exact />
          <Route path="/books/:id" element={<EditBook/>} exact />
        </Route>
        <Route element={<ProtectLogin/>}>
          <Route path="/login" element={<Login setLogin={setLogin} />} exact /> 
          <Route path="/register" element={<Register/>} exact /> 
          <Route path="/" element={<Login setLogin={setLogin} />} exact /> 
        </Route>

        <Route element={<ProtectAdmin/>}>
          <Route path="/users" element={<Users/>}/>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
