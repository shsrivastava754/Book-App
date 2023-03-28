import Header from "./components/common/Header";
import Booklist from "./components/Booklist";
import Form from "./components/Form";
import BookDetails from "./components/BookDetails";
import EditBook from "./components/EditBook";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} exact /> 
        <Route path="/login" element={<Login/>} exact /> 
        <Route path="/register" element={<Register/>} exact /> 
        <Route path="/books" element={<Booklist/>} exact />
        <Route path="/addBook" element={<Form/>} exact />
        <Route path="/:id" element={<BookDetails/>} exact />
        <Route path="/books/:id" element={<EditBook/>} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
