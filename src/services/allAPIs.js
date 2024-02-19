//All API calls

import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Register API call
export const registerAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//Login API call
export const loginAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

//Add project API call
export const addProjectAPI = async(reqBody, reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/project/add`,reqBody,reqHeader)
}

//get home project API call
export const homeProjectAPI = async()=>{
    return await commonAPI("get",`${baseUrl}/project/home-project`,"","")
}

//get all projects api call
export const allProjectAPI =  async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/project/all-project?search=${searchKey}`,"",reqHeader)
}

//get all projects of a user api call
export const userProjectAPI =  async(reqHeader,user)=>{
    return await commonAPI("get",`${baseUrl}/project/all-user-projects`,"",reqHeader)
}

//update user project api call
export const updateUserProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/project/update-project/${projectId}`,reqBody,reqHeader)
}

//delete project api call
export const deleteUserProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/project/delete-project/${projectId}`,{},reqHeader)
}

export const userDetailsAPI =  async(reqHeader,user)=>{
    return await commonAPI("get",`${baseUrl}/user-details`,"",reqHeader)
}