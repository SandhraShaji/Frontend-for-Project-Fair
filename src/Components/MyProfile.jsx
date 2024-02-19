import React, { useEffect, useState } from 'react'
import { userDetailsAPI } from '../services/allAPIs'

function MyProfile() {
  // const [userDetails,setUserDetails] = useState({})
  // const fetchUserDetails = async()=>{
  //   const token = sessionStorage.getItem("token")
  //   console.log(token);
  //   if(token){
  //     const reqHeader ={
  //       "Content-Type":"application/json",
  //       "Authorization":`Bearer ${token}`
  //     }
  //     try{
  //       const result = await userDetailsAPI(reqHeader)
  //       if(result.status==200){
  //         setUserDetails(result.data)
  //         console.log(userDetails);
  //       }
  //       else{
  //         alert("Failed to get user details")
  //       }
  //     }
  //     catch(err){
  //       alert("Error getting user details"+err.message)
  //     }
  //   }
  // }
  // useEffect(()=>{
  //   fetchUserDetails()
  // },[])
  return (
    <div>
        <div style={{boxShadow:'1px 1px 5px grey'}} className='container text-center rounded m-3 p-4 w-75'>
            <h3 className='my-3'>My Profile</h3>
            <label>
              <input type="file" style={{display:'none'}}/>
              <img width={'100px'} src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt=""/>
            </label>
            <div className='w-75 my-4' style={{marginInline:'15%'}}>
              <input type="text" placeholder='Username' className='form-control my-2'/>
              <input type="text" placeholder='GitHub' className='form-control my-2'/>
              <input type="text" placeholder='LinkedIn' className='form-control my-2'/>
              <div className='d-flex justify-content-evenly mt-4'>
                <button style={{height:'40px', paddingBlock:'5px'}} className='btn btn-success'>Add</button>
                <button style={{height:'40px', paddingBlock:'5px'}} className='btn btn-primary'>Update</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile