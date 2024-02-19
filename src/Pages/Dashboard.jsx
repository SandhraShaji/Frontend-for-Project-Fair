import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyProject from '../Components/MyProject';
import MyProfile from '../Components/MyProfile';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function Dashboard() {
  const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
  console.log(existingUser);
  
  return (
    <div>
      <Header/>
      <div>
        <Row>
        <h2 className='my-5 mx-4'>Welcome <span className='text-danger'>{existingUser.username}</span></h2>
          <Col>
            <MyProject/>
          </Col>
          <Col>
            <MyProfile/>
          </Col>
        </Row>
        <Link to={'/projects'}>
        <div className='text-center'>
            <button style={{backgroundColor:'black'}} className='btn rounded-pill shadow my-3 px-4'>View Projects</button>
        </div>
        </Link>
      </div>
    </div>
  )
}
export default Dashboard