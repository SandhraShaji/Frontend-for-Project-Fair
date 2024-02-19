import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectCard from '../Components/ProjectCard';
import { allProjectAPI } from '../services/allAPIs';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
function Project() {
  //to hold search value from the input box
  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey);

  //to hold all project details
  const [allProject, setAllProject] = useState([])
  //api call function
  const getAllProjects = async()=>{
    //get token
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await allProjectAPI(searchKey,reqHeader)
        if(result.status == 201){
          setAllProject(result.data)
          console.log(allProject);
        }
        else{
          alert("Failed to get project")
        }
      }
      catch(err){
        alert("Error getting project"+err.message)
      }
    }
  }
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  return (
    <div>
      <div className="container">
        <h2 className='text-center m-4'>All Projects</h2>
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex rounded m-5 w-50">
            <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search by Technology' className='form-control'/>
            <i style={{marginLeft:'-45px'}} class="fs-3 mt-2 me-5 fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <Row>
          {
            allProject.length>0?allProject.map((item,index)=>(
              <Col key={index}>
                <ProjectCard project={item}/>
              </Col>
            )):
            <div>No project found</div>
          }
        </Row>
      </div>
    </div>
  )
}

export default Project