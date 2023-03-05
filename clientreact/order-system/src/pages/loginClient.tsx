import { useState } from "react"
import { useNavigate,Link } from "react-router-dom";


export default function LoginClient(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const Navigate=useNavigate()
    let LoginSubmit=(e:any)=>{
        e.preventDefault()
        fetch('http://localhost:3001/client/login',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({onoma:name,password:password})
        }).then(res=>res.json())
        .then((data)=>{
            if(data.success){
                localStorage.setItem('id',data.id)
                Navigate('/client/shops')
            }
            else{
                setMessage(data.message)
            }
        })
        
    }

    return(
       <div>
       <form className="SubmitLogin" onSubmit={LoginSubmit}>
        <label htmlFor="onoma">Ονομα:</label>
        <input id="onoma" type="text" required onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="password">Κωδικός:</label><br/>
        <input id="password" type="text" required onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Σύνδεση</button>
       </form>
       <div className="errorMessage">{message}</div>
       </div>
    )
}