import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function RegisterShop(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    const Navigate=useNavigate()
    let SubmitRegister=(e:any)=>{
        e.preventDefault()
        fetch('http://localhost:3001/shop/register',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({name:name,password:password,email:email})
    }).then(res=>res.json())
    .then((data)=>{
        if(data.success){
            Navigate('/shop/currentclients')
        }
        else{
            setMessage(data.message)
        }
    })
}
    return(
        <div className="RegisterClient">
            <form className="registerform" onSubmit={SubmitRegister}>
                <label htmlFor="name">Onoma:</label>
                <input id="name" type="text" required onChange={(e)=> setName(e.target.value)} value={name}/>
                <label htmlFor="password">Password</label>
                <input id="password" type="text" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                <label htmlFor="email">Email adress:</label>
                <input id="email" type="email" required onChange={(e)=> setEmail(e.target.value)} value={email}/>
                <button type="submit">Register</button> 
            </form>
        </div>
    )
}