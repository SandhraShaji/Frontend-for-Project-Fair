import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProImg from '../assets/img1.png'
import {baseUrl} from '../services/baseUrl'
import { updateUserProjectAPI } from '../services/allAPIs';
import { editUserProjectContextApi } from '../ContextAPI/ContextShare';

function EditProject({project}) {
  const {editUserProjectRes,setEditUserProjectRes} = useContext(editUserProjectContextApi)
  console.log(project);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    id:project._id, title:project.title, language:project.language, github:project.github, link:project.link, 
    overview:project.overview, projectImage:""
  })
  //to hold image file data converted into url
  const [preview,setPreview] = useState("")
  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  console.log(preview);
  console.log(projectDetails);

  const updateProject =async()=>{
    const{id,title,language,github,link,overview,projectImage}= projectDetails
    // if(!title||!language||!github||!link||!overview||!projectImage){
    //   alert('Please fill all details')
    // }
    // else{
      //api call
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
    
    //get token
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(preview){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await updateUserProjectAPI(id,reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        console.log(result.data);
        setEditUserProjectRes(result.data)
        alert('Project updated successfully')
        handleClose()
      }
      else{
        console.log(result.response.data);
        setEditUserProjectRes(result.response.data)
      }
    }
    else{
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await updateUserProjectAPI(id,reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        console.log(result.data);
        setEditUserProjectRes(result.data)
        alert('Project updated successfully')
        handleClose()
      }
      else{
        console.log(result.response.data);
        setEditUserProjectRes(result.response.data)
      }
    }
 // }
  }
  return (
    <div>
      <button onClick={handleShow} className='btn btn-secondary'><i className='fa-solid fa-pen'></i></button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex justify-content-evenly'>
            <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img width={'280px'} src={preview?preview:`${baseUrl}/uploads/${project.projectImage}`} alt="" />
            </label>
            <div>
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" placeholder='Project Title' className='form-control mb-3'/>
                <input value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" placeholder='Languages Used' className='form-control mb-3'/>
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" placeholder='GitHub Link' className='form-control mb-3'/>
                <input value={projectDetails.link} onChange={e=>setProjectDetails({...projectDetails,link:e.target.value})} type="text" placeholder='Website Link' className='form-control mb-3'/>
                <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" placeholder='Project Overview' className='form-control mb-3'/>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateProject} variant="secondary" >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProject