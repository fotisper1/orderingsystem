import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function RegisterClient(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [informations,setInformations]=useState("")
    const [message,setMessage]=useState("")
    const [address,setAddress]=useState("")
    const Navigate=useNavigate()
    let SubmitRegisterClient=(e:any)=>{
        e.preventDefault()
        fetch('http://localhost:3001/client/register',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({name:name,password:password,email:email,informations:informations,Address:address})
    }).then(res=>res.json())
    .then((data)=>{
        if(data.success){
            Navigate('/client/shops')
        }
        else{
            setMessage(data.message)
        }
    })
}
    return(
        <div className="RegisterClient">
            <form className="registerform" onSubmit={SubmitRegisterClient}>
                <label htmlFor="onoma">Onoma:</label>
                <input id="onoma" type="text" required onChange={(e)=> setName(e.target.value)} value={name}/>
                <label htmlFor="password">Password</label>
                <input id="password" type="text" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" required onChange={(e)=> setEmail(e.target.value)} value={email}/>
                <label htmlFor="address">Adress:</label>
                <input id="address" type="text" required onChange={(e)=> setAddress(e.target.value)} value={address} />
                <label htmlFor="informations">Other informations</label>
                <input id="informations" type="text" required onChange={(e)=> setInformations(e.target.value)} value={informations}/>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}