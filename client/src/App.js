import { useState } from "react"
import Login from "./components/Login"
import MainPage from "./components/MainPage"
import axios from 'axios'
const App = () => {
  const [logedin,setLogedin] = useState(false)
  const [user,setUser] = useState(null) // string with user name to send requests to the server from the main  page
  const [err,setErr] = useState(null) // state to print erros to the user

  
      
      
       
    
  
  const handleLogin = (url,username,password) =>{
        
      axios.post(url,{username:username,password:password}).then(response=>{
        setUser(response.data)
        setLogedin(!logedin)
        
        
      })
      .catch(err=>{
        setErr(err.response.data) 
      })
     
  }

  return (
    <div>
      {logedin? 
     <MainPage username={user}/> : <Login err={err} handleClick={handleLogin}/>}
    </div>
  );
}

export default App;