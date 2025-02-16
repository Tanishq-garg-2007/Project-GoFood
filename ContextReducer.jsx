import React, { useContext, useReducer,createContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action)=> {
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}];
        case "REMOVE":
            let newarr = [...state];
            newarr.splice(action.index,1);
            return newarr;
        case "Clear":
            return [];
        case "Update":
            let arr = [...state];
            arr.find((food,index)=>{
                if(food._id==action._id){
                    arr[index] = {...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
                }
                return arr
            })
            return arr;
        default:
            console.log("Error In Reducer");
    }
}

export const CartProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
        
    )
}

export const useCart = () =>useContext(CartStateContext);
export const useDispatchCart = ()=>useContext(CartDispatchContext);