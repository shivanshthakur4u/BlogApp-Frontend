import { axios } from "../Axios/axios"
import { SignInFormType, SignupFormType } from "@/types/types"


export const registerUser =(formData:SignupFormType)=>{
   return axios({
    method: 'POST',
    url: '/user/register',
    data:formData,
   })
}

export const signinUser =(formData:SignInFormType)=>{
    return axios({
     method: 'POST',
     url: '/user/login',
     data:formData,
    })
 }