import React from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return ( 
    <div style={{minHeight:"100vh"}} className="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center">
            <h1 style={{fontSize:"10vh",fontWeight:"bold"}}>The Cart Is Empty!!!</h1>
        </div>
    </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const endup=(index)=>{
    dispatch({type:"Clear"});
    navigate("/endup")
  }

  return (
    <div style={{ minHeight: "100vh", maxHeight: "auto" }}>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" className="text-white fs-5">
              #
            </th>
            <th scope="col" className="text-white fs-5">
              Name
            </th>
            <th scope="col" className="text-white fs-5">
              Quantity
            </th>
            <th scope="col" className="text-white fs-5">
              Option
            </th>
            <th scope="col" className="text-white fs-5">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr>
              <th scope="row" className="text-white">{index+1}</th>
              <td className="text-white">{food.name}</td>
              <td className="text-white">{food.qty}</td>
              <td className="text-white">{food.size}</td>
              <td className="text-white">₹{food.price}</td>
              <td><button type="button" className="btn d-flex justify-content-center align-items-center" onClick={()=>{dispatch({type:"REMOVE",index:index})}}><MdDelete/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><h1>Total Price : ₹{totalPrice}</h1></div>
      <div><button className="btn btn-success m-2" onClick={()=>endup(data.length)}>Check Out</button></div>
    </div>
  );
};

export default Cart;
