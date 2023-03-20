import Header from "./components/Header";
import Booklist from "./components/Booklist";
import Form from "./components/Form";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  // const [books, setbooks] = useState(
  //   [
  //     {
  //       title: "Book 1",
  //       author: "Shaan Srivastava",
  //       price: 447,
  //       description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature"
  //     },
  //     {
  //       title: "Book 2",
  //       author: "Jwuqwojn kubhkwejbn",
  //       price: 247,
  //       description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature"
  //     },
  //     {
  //       title: "Book 3",
  //       author: "WFweik wkjnfwe",
  //       price: 292,
  //       description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature"
  //     },
  //     {
  //       title: "Book 4",
  //       author: "Awkedu ewkjnew",
  //       price: 1010,
  //       description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature"
  //     }

  //   ]

    // );
    
  let deleteBook = (book)=>{
    console.log("Delete book called!!");
  };

  let editBook = (book)=>{
    console.log("Edititng");
  }
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Booklist deleteBook={deleteBook} editBook={editBook} />} /> 
        <Route path="/addBook" element={<Form/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
