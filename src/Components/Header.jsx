import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
  
function Header() {
  const location = useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    location('/')
  }
  return (
    <div>
        <MDBNavbar light bgColor='black'>
        <MDBContainer fluid>
          <MDBNavbarBrand style={{color:'white'}} href='/'>
          <i class="fa-solid fa-laptop-code me-2"></i>
            Project Fair
          </MDBNavbarBrand>
          <button onClick={logout} className='btn'>logout</button>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header