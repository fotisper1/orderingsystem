import { useEffect, useState } from "react";

export default function MyOrdersClient(){
    const [Orders,setOrders]=useState([])
    const [errormessage,setErrorMessage]=useState("")
    const clientid=localStorage.getItem('id')
    let fetchdata= async()=>{
        await fetch(`http://localhost:3001/client/lastorders/${clientid}`,{
        method:'GET',
        headers: {"Content-Type": "application/json"},
        }).then(res=>res.json())
        .then((data)=>{
            if(data.success){
                setOrders(data.orders)
            }
            else{
                setErrorMessage(data.message)
            }
        
    })
    }
    useEffect(()=>{
        fetchdata()
    },[])
    return(
        <div className="Myorders">{Orders.map((order:any)=>{
            return(
                <div className="Oneorder">
                    <h5>{order.ShopName}</h5>
                    <h3>{order.Value}</h3>
                    <h4>{order.Details}</h4>
                </div>

            )
        })}</div>
    )
}