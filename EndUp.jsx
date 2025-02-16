import React from 'react'
import { useNavigate } from 'react-router-dom'
const EndUp = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div style={{minHeight:"100vh",maxHeight:"auto"}} className="d-flex justify-content-center align-items-center flex-column">
        <p style={{fontSize:"10vh",fontWeight:"bold"}}>Your Order Has Been Delivered!!</p>
        <p style={{fontSize:"3vh"}}>Please Visit Again</p>
        <button className="btn btn-success text-white" style={{fontWeight:"600"}} onClick={()=>navigate("/")}>Shop Again</button>
      </div>
    </div>
  )
}

export default EndUp
