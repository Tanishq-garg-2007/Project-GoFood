import React,{ useState,useEffect } from 'react'
import Card from './Card'
import Carousel from './Carousel'

const Home = () => {
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);

  const loadData = async ()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
      loadData();
  })


  return (
    <>
    <div>
      <Carousel/>
    </div>

    <div style={{minHeight:"80vh",maxHeight:"auto"}} className='container'>

      {
        foodCat.length >0
        ?foodCat.map((data)=>{
          return (<>
            <div key={data._id} className="fs-3 m-3 row">{data.CategoryName}</div>
            <hr />
            {foodItem.length >0? (<div className='row'>{foodItem.
            filter((item)=>item.CategoryName==data.CategoryName).map(filterItems=>
            {return (<div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mx-3'><Card foodItem={filterItems} options={filterItems.options[0]}/></div>)})}</div>)
            :<div>No Such Data Found</div>}
            </>
          )
        }):""

      }
    </div>
    </>
  )
}

export default Home
