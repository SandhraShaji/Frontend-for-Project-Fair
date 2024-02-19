import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProImg from '../assets/img1.png'
import { addProjectAPI } from '../services/allAPIs';
import { addProjectContextApi } from '../ContextAPI/ContextShare';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function AddProject() {
  const {addProjectRes, setAddProjectRes} = useContext(addProjectContextApi)
  const [token,setToken] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    title:"",language:"",github:"",link:"",overview:"",projectImage:""
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
  const projectAdd=async()=>{
    const{title,language,github,link,overview,projectImage}= projectDetails
    if(!title||!language||!github||!link||!overview||!projectImage){
      alert('Please fill all details')
    }
    else{
      //api call
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
      // let reqHeader
      const reqHeader = {
        //multipart/form-data is for file data and application/json is for text input
        "Content-Type":"multipart/form-data", //it indicates the request contains an image file
        "Authorization":`Bearer ${token}` //to send token fom client side to server side
      }
    const result = await addProjectAPI(reqBody,reqHeader);
    console.log(result);
    if(result.status===200){
      // toast.success('Project added successfully')
      alert('Project added successfully')
      setAddProjectRes(result.data) //contextAPI state value assigned
      console.log(result.data);
      handleClose()
      setProjectDetails({
        title:"", language:"",github:"",link:"",overview:"",projectImage:""
      })
      setPreview("")
    }
    else{
      console.log(result.response.data);
    }
  }
  }
  return (
    <div>
      <button onClick={handleShow} className='btn btn-success'>Add project</button>
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
                <img width={'280px'} src={preview?preview:ProImg} alt="" />
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
          <Button variant="secondary" onClick={projectAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      {/* <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"/> */}
    </div>
  )
}

export default AddProject