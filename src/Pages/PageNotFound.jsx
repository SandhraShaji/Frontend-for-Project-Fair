import React from 'react'
import pagenotfound from '../assets/pagenotfound.png';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
function PageNotFound() {
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
      <div className='text-center'>
      <img width={'50%'} src={pagenotfound} alt="" />
      </div>
    </div>
  )
}

export default PageNotFound