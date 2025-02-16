import React,{useEffect, useRef, useState} from "react";
import { useDispatchCart,useCart} from "./ContextReducer";

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty,setQTY] = useState(1);
  const [size,setSize] = useState("");
  const handleAddtocart = async () =>{
    let food=[];
    for(const item of data){
      if(item.id==props.foodItem._id){
        food = item;
        break;
      }
    }
    if(food.length>0){ 
    if(food.size === size){
      await dispatch({type:"UPDATE",id:props.foodItem._id,qty:qty,price:finalPrice });
      return
    }
    else{
    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice,qty:qty,size:size})
    return
    }  
    return
  }
  
    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice,qty:qty,size:size})
  }
  const priceRef = useRef();
  let finalPrice = qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  
  return (
    <div>
      <div>
        <div
          className="card my-4 mx-4 bg-dark text-white "
          style={{ maxHeight: "360px", width: "18rem" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"150px",objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <div className="container w-100 d-flex justify-content-center align-items-center flex-direction-column">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQTY(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                  {priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })}
              </select>

              <button className={`btn btn-secondary ms-2`} onClick={handleAddtocart}>Add</button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2"><h4> Total Price: ₹{finalPrice}/-</h4></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;