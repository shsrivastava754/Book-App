import Header from "./components/Header";
import Booklist from "./components/Booklist";
import Form from "./components/Form";
import BookDetails from "./components/BookDetails";
import EditBook from "./components/EditBook";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  let deleteBook = (book)=>{
    console.log("Delete book called!!");
  };

  let editBook = (id)=>{
    console.log(id);
  }
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Booklist deleteBook={deleteBook} editBook={editBook}  exact />} /> 
        <Route path="/addBook" element={<Form/>} exact />
        <Route path="/:id" element={<BookDetails/>} exact />
        <Route path="/books/:id" element={<EditBook/>} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
