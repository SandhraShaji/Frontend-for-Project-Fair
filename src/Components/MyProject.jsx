import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteUserProjectAPI, userProjectAPI } from '../services/allAPIs'
import { addProjectContextApi, editUserProjectContextApi } from '../ContextAPI/ContextShare'
import EditProject from './EditProject'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function MyProject() {
  const {addProjectRes, setAddProjectRes} = useContext(addProjectContextApi)
  const {editUserProjectRes,setEditUserProjectRes} = useContext(editUserProjectContextApi)
    //to hold project details
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
        const result = await userProjectAPI(reqHeader)
        if(result.status == 200){
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
  },[addProjectRes,editUserProjectRes])

  const deleteProject = async(pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await deleteUserProjectAPI(pid,reqHeader)
      console.log(result);
      getAllProjects()
      // toast.error("User project deleted successfully")
      alert('User project deleted successfully')
    }
  }
  return (
    <div style={{boxShadow:'1px 1px 5px grey'}} className='m-4 p-4 rounded'> 
        {/* this is called react fragment which returns the html output of the function */}
        <div className='d-flex m-3'>
            <h3>My Projects</h3>
            <div className='ms-auto'>
                <AddProject/>
            </div>
        </div>
        {
            allProject.length>0?allProject.map((item,index)=>(
                <div key={index} style={{boxShadow:'1px 1px 5px grey'}} className='m-3 mt-4 px-3 py-2 d-flex align-items-center justify-content-between rounded'>
                <h5>{item.title}</h5>
                <div>
                    <button style={{border:'none', borderRadius:'10px'}} className='me-2'><EditProject project={item}/></button>
                    <a href={item?.github} target='_blank' className='btn btn-secondary me-2'><i className='fa-brands fa-github'></i></a>
                    <button onClick={()=>deleteProject(item?._id)} className='btn btn-secondary me-2'><i className='fa-solid fa-trash'></i></button>
                </div>
                </div>
              )):
              <div>No project found</div>
        }
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

export default MyProject