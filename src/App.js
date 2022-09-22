import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Posts/>}/>
      <Route path="/createpost" element={<CreatePost/>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
