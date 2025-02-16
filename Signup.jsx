import React from 'react'
import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Signup = () => {
  let navigate = useNavigate();
  const[credit,setCredit]=useState({name:"",email:"",location:"",password:""});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/creatuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credit)
      });
  
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert("Enter Valid Credentials");
      }
      if(json.success){ 
      navigate("/login");
      setCredit({name:"",email:"",location:"",password:""});
    }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to the server");
    }
  };

  const onchange = (event) =>{
    setCredit({ ...credit,[event.target.name]:event.target.value})
  }

  return (
    <div style={{minHeight:"90vh",display:"flex",justifyContent:"space-evenly",alignItems:"center"}} className='container'>
    <div className='Text'>
    <p className='text-success' style={{fontWeight:"500",fontSize:"2vw"}}>New To <strong style={{fontSize:"3vh",fontWeight:"700"}}>GOFOOD ??<br /></strong><strong style={{fontSize:"10vh",fontWeight:"900"}}>SignUp Now!! <br /></strong>For Better Experience</p>
    </div>


    <div className='Input'>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">UserName</label>
    <input type="text" className="form-control bg-dark" id="exampleFormControlInput1" placeholder="Enter Your Name" name='name' value={credit.name} onChange={onchange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
    <input type="email" className="form-control bg-dark" id="exampleFormControlInput1" placeholder="Enter Your Email-Id" name='email' value={credit.email} onChange={onchange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
    <input type="password" className="form-control bg-dark" id="exampleFormControlInput1" placeholder="Enter Your Password" name='password' value={credit.password} onChange={onchange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
    <input type="text" className="form-control bg-dark" id="exampleFormControlInput1" placeholder="Enter Your Location" name='location' value={credit.location} onChange={onchange}/>
    </div>
    <button type="submit" className='m-3 btn btn-success'>Submit</button>
    <Link to="/login" className='m-3 btn btn-danger'>Already A User</Link>
    </form>
    </div>
    </div>
  )
}

export default Signup
