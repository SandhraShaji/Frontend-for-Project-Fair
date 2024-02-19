import React, { useEffect, useState } from 'react'
import titleImage from '../assets/img1.png'
import ProjectCard from '../Components/ProjectCard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPIs';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
function Home() {
    //api call to get home project details
    const [homeProject,setHomeProject] = useState([])
    const getHomeProject = async()=>{
        const result = await homeProjectAPI()
        console.log(result);
        if(result.status==201){
            setHomeProject(result.data)
            console.log(homeProject)
        }
        else{
            console.log('API fetching project details failed');
        }
    }
    useEffect(()=>{
        getHomeProject()
    },[])
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
      <div className="container">
            <div className="row mx-5 my-4">
                <div className="col-6 p-4">
                    <h1 className='text-center my-4'>Project Fair</h1>
                    <p style={{textAlign:'justify'}}>Project management focuses on planning and organizing a project and its resources. 
                        This includes identifying and managing the lifecycle to be used, applying it to the 
                        user-centered design process, formulating the project team, and efficiently guiding 
                        the team through all phases until project completion.
                    </p>
                    <div className='text-center'>
                        <Link to={'/login'}>
                        <button style={{backgroundColor:'black'}} className='btn rounded-pill shadow my-3 px-4'>Get started</button>
                        </Link>
                    </div>
                </div>
                <div className="col-6">
                    <img width={'420px'} src={titleImage} alt="" />
                </div>
            </div>
            <div className="row my-4">
            <div className="col">
                <h2 className='text-center m-4'>Explore Projects</h2>
                <marquee>
                    <Row className='my-4'>
                       {
                        homeProject.length>0?homeProject.map(item=>(
                            <Col>
                                <ProjectCard project={item}/>
                            </Col>
                        )):"empty array"
                       }
                    </Row>
                </marquee>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home