import { useEffect, useState } from "react";


export default function LastOrdersShop(){
    const [message,setMessage]=useState("")
    const [orders,SetOrders]=useState([])
    const shopid= localStorage.getItem('id')
    let fetchdata= async ()=>{
        await fetch(`http://localhost:3001/shop/lastorders/${shopid}`,{
        method:'GET',
        headers: {"Content-Type": "application/json"}
    })
    .then(res=>res.json())
    .then((data)=>{
        if(data.success){
            SetOrders(data.orders)
        }
        else{
            setMessage(data.message)
        }
    })
    }
    useEffect(()=>{
        fetchdata()
    },[])

return(
    <div className="Myorders">{orders.map((order:any)=>{
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