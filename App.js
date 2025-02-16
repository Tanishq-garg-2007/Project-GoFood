import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Login from './components/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Signup from './components/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './components/Cart';
import EndUp from './components/EndUp';
function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar/> 
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/SignUp" element={<Signup/>}/>
        <Route exact path="/Cart" element={<Cart/>}/>
        <Route exact path="/endup" element={<EndUp/>}/>

      </Routes>
    </div>
    <Footer/>
    </Router>
    </CartProvider>
  );
}

export default App;
