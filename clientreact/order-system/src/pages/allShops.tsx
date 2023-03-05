import { useEffect, useState } from "react";
import {Link} from "react-router-dom"


export default function AllShops(){
    const [message,setMessage]=useState("")
    const [shops,setShops]=useState<any>([])
    const fetchdata=async()=>{
    await fetch('http://localhost:3001/client/allshops',{
        method:'GET',
        headers: {"Content-Type": "application/json"}
    })
    .then(res=>res.json())
    .then((data:any)=>{
        if(data.success){
            setShops(data.shops)
            console.log(data.shops)
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
        <div className="shops">{shops.map((shop:any)=>{
            return(
                <div><Link to={`/client/${shop.Id}`}>{shop.Name}</Link></div>
                )
            })}
        </div>
    )
}