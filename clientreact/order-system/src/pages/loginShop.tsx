import { useState } from "react"
import { useNavigate,Link } from "react-router-dom";


export default function LoginShop(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const Navigate=useNavigate()
    let LoginSubmit=(e:any)=>{
        e.preventDefault()
        fetch('http://localhost:3001/shop/login',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({onoma:name,password:password})
        }).then(res=>res.json())
        .then((data)=>{
            if(data.success){
                localStorage.setItem('id','1')
                Navigate('/shop/currentclients')
            }
            else{
                setMessage(data.message)
            }
        })
    }

    return(
       <form className="SubmitLogin" onSubmit={LoginSubmit}>
        <label htmlFor="name">Ονομα:</label>
        <input id="name" type="text" required onChange={(e) => setName(e.target.value)} value={name}/><br/>
        <label htmlFor="password">Κωδικός:</label>
        <input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/><br/>
        <button type="submit">Σύνδεση</button>
       </form> 
    )
}