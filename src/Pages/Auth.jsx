import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPIs'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
function Auth({register}) {
  const location = useNavigate()
  const isRegisterForm = register?true:false 
  const [userData, setUserData] = useState({
    username:"",
    email:"",
    password:""
  })
  const registerData = async()=>{
    const {username,email,password} = userData
    if(!username || !email || !password){
      alert("Please fill all details")
    }
    else{
      const result = await registerAPI(userData)
      console.log(result);
      if(result.status==200){
        alert(result.data)
        location('/login')
      }
      else(
        alert(result.response.data)
      )
    }
  }
  const login = async()=>{
    const {email,password} = userData
    if(!email || !password){
      alert("Please fill all details")
    }
    else{
      const result = await loginAPI(userData)
      console.log(result); 
      if(result.status==200){
        alert("Login successful")
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.user))
        sessionStorage.setItem('token',result.data.token)
        location('/dashboard')
      }
      else(
        alert("Invalid Login")
      )
    }
  }
  return (
    <div>
    <div>
        <MDBNavbar light bgColor='black'>
        <MDBContainer fluid>
          <MDBNavbarBrand style={{color:'white'}} href='/'>
          <i class="fa-solid fa-laptop-code me-2"></i>
            Project Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
      <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-4489776-3757211.png?f=webp" alt="" />
            </div>
            <div style={{backgroundColor:'rgba(0,0,0,0.3)'}} className="col-6 py-3 px-5">
              <h2 className='text-center my-3'>Project Fair</h2>
              <h5 className='text-center my-4'>
                {
                  isRegisterForm?'Register Here':'Login Here'
                }
              </h5>
              <form>
                {
                  isRegisterForm &&
                  <input type="text" value={userData.username} onChange={e=>setUserData({...userData, username:e.target.value})} placeholder='Username' className='form-control mb-3' />
                }
                <input type="text" value={userData.email} onChange={e=>setUserData({...userData, email:e.target.value})} placeholder='Email' className='form-control mb-3'/>
                <input type="text" value={userData.password} onChange={e=>setUserData({...userData, password:e.target.value})} placeholder='Password' className='form-control mb-3'/>
              </form>
              {
                isRegisterForm ?
                <div className='text-center my-4'>
                  <button onClick={registerData} className='btn btn-success'>Register</button>
                  <Link  style={{textDecoration:'none', color:'white'}} to={'/login'}>
                    <p className='my-4'>Already registered? Please login from here</p>
                  </Link>
                </div>
                :
                <div className='text-center my-4'>
                  <button onClick={login} className='btn btn-warning'>Login</button>
                  <Link  style={{textDecoration:'none', color:'white'}} to={'/register'}>
                    <p className='my-4'>New here? Please register</p>
                  </Link>
                </div>
              }
            </div>
          </div>
        <div className='text-center my-3'>
          <Link to={'/'}>
            <button className='btn btn-primary'>Go back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Auth