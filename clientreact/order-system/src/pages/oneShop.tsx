import { useState } from "react";
import {useParams,useNavigate} from "react-router-dom"

export function OneShop(){
    const [details,setDetails]=useState("")
    const [value,setValue]=useState("")
    const {shopid}=useParams()
    const [message,setMessage]=useState("")
    const Navigate=useNavigate()
    let CreateOrder=(e:any)=>{
        e.preventDefault()
        const clid=localStorage.getItem('id')
        console.log(clid)
        fetch('http://localhost:3001/client/createorder',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({details:details,value:value,shopid:shopid,clientid:clid})
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.success){
                Navigate(`/client/neworder/${data.order.OrderId}/${shopid}`)
            }
            else{
                setMessage(data.setMessage)
            }
        })
    }
    return(
        <div className="one-shop">
          <form className="oneshop" onSubmit={CreateOrder}>
            <label htmlFor="details">Details:</label>
            <input id="details" type="text" required onChange={(e)=>setDetails(e.target.value)} value={details} />
            <label htmlFor="value">Value:</label>
            <input id="value" type="text" required onChange={(e)=>setValue(e.target.value)} value={value} />
            <button type="submit">Create order</button>
          </form>
          <h5>{message}</h5>
        </div>

    )
}