import { useRef } from "react"

const Login = ({handleClick,err}) =>{

    const userRef = useRef(null)
    const passwordRef = useRef(null)
   
 

    return(
        <div className="LoginContiner">
        <h1 className="Title">music player</h1> 
        <form className="FormContiner">
            <label className="SubTitle" style={{textAlign:'center'}}>Sign up/login:</label>
            
            <input ref={userRef} className="input" placeholder="Username" type="text"></input>
            
            <input ref={passwordRef} className="input" placeholder="Password" type="password"></input>

            <label className="error">{err}</label>
             
             {/*hide orignal submit button*/}
            <div><button type="submit" className="button hidden" ></button>
            {/*sing up button*/}
            <button type="button" className="button" onClick={(e)=>handleClick('/users',userRef.current.value,passwordRef.current.value)} >Sign up</button>
             {/*login button*/}
            <button  type="button" className="button" onClick={(e)=>handleClick('/users/login',userRef.current.value,passwordRef.current.value)} style={{marginLeft:10}}>Login</button></div>
        </form>

        
        </div>
    )

}

export default Login
