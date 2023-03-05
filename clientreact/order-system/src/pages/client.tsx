/*import { useState } from "react"
import {useParams} from 'react-router-dom'
import socketIOClient from 'socket.io-client';


export default function Client (){
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState("")
    const {orderid}=useParams()
    const resData=orderid

    const socket = socketIOClient('ws://localhost:3100');

    socket.emit('create_order',(resData))
    socket.on('status_order',(data:any)=>{
        if(data.status==1){
            setStatus('accept')
        }
        else if(data.status==2){
            setStatus('reject')
        }
        else if(data.status==3){
            setStatus('done')
        }
    })
        
    socket.emit('create_order',resData)
    

    



    return(
        <div>
        <h3>aelole</h3>
        </div>
    )
}*/
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import socketIOClient from 'socket.io-client';
export default function Client() {
  const { orderid } = useParams()
  const {shopid}= useParams() 
  const [stage,setStage]=useState<any>("")
  const [message,setMessage]=useState<any>("")

  useEffect(() => {
    const socket = socketIOClient('ws://localhost:3200')
    let data={
      OrderId:orderid,
      ShopId:shopid,
      ClientId:localStorage.getItem('id')
    }
    socket.emit('create_order', (data))
    
    socket.on('status_order',(resData)=>{
      console.log('mpike')
      setStage(resData.stage)
      setMessage(resData.message)
    })

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [orderid])

  return (
    <div>
      <h3>{message}</h3>
    </div>
  )
}
