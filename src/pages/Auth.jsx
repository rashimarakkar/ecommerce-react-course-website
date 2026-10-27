import { useState } from "react"
import {useForm} from "react-hook-form"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState("signUp")
  const [error, setError] = useState(null)
  const {signup, login}= useAuth()
  const {register, handleSubmit, formState:{errors }}= useForm()
 const onSubmit = (data)=>{
  setError(null)
  let result;
  if(mode==="signUp"){
      result = signup(data.email, data.password)
  }else{
    result =login(data.email, data.password)
  }

  console.log(result)
  if(result.success){
    navigate("/")
  }else{
    setError(result.error)
  }
 
 }

  return (
   <div className="page">
    <div className="container">
      <div className="auth-container">
      
    
        <h1 className="page-title"> { mode=== "signUp" ? "Sign Up" : "Login"}</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
         <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" type="email" id="email" {...register("email",{required:"Email is required"})} />
          {errors.email &&(
            <span className="form-error">{errors.email.message}</span>
          ) }
          </div>

           <div className="form-group">
         <label className="form-label" htmlFor="password">Password</label>
          <input className="form-input" type="password" id="password"  {...register("password",
            {
              required:"password is required",
              minLength:{
                value:6,
                message:"Password must be atleast 6 charactors"
              },
              maxLength:{
                value:12,
                message:"password must be less than 12 charactors"
              }
            }
            
            )}/>
              {errors.password &&(
            <span className="form-error">{errors.password.message}</span>
          ) }
          </div>

          <button type="submit" className="btn btn-primary btn-large">{ mode=== "signUp" ? "Sign Up" : "Login"}</button>
         

        </form>

        <div className="auth-switch">
        
            { mode=== "signUp" ? (<p>
             Already have an account? {" "}<span className="auth-link" onClick={()=>setMode("Login")}>Login</span>
            </p>) :<p>
              Don't have an account? {" "}<span className="auth-link" onClick={()=>setMode("signUp")}>Sign Up</span>
            </p> }
            
            
            
          
         

        </div>

      </div>

    </div>

   </div>
  )
}
