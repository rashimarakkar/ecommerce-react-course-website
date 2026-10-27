import { createContext, useState } from "react";

export const AuthContext = createContext(null)
export default function AuthProvider({children}){
  const [user, setUser]= useState(localStorage.getItem("currentUserEmail") ? {email: localStorage.getItem("currentUserEmail")} :null)  

  const signup=(email,password)=>{
    console.log('signup')
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.find(u=> u.email === email)){
        return {success: false, error: "Email already exists"}
    }
    const newUser={email, password}
    users.push(newUser);
    console.log(users)
    localStorage.setItem("users",JSON.stringify(users)) ;
    localStorage.setItem("currentUserEmail",JSON.stringify(email)) ;
    setUser({email})
    return { success: true}
  }

const login = (email, password) => {
    console.log("login")
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("currentUserEmail",email)
    setUser({email});
    return { success: true};
  }

  return {
    success: false,
    error: "Incorrect email or password",
  };
};

const logout =()=>{
    localStorage.removeItem("currentUserEmail")
    setUser(null)
}
return <AuthContext.Provider value={{user, signup, login, logout}}>{children}</AuthContext.Provider>
}