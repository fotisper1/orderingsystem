import { useState,useEffect } from "react";
import socketIOClient from 'socket.io-client';

/*export default function Shop(){
    const [neworders,setNeworders]=useState<any>([])
    const socket = socketIOClient('ws://localhost:3200');
    socket.emit('my_shop',{shopId:localStorage.getItem('id')})
    socket.on('current_orders',(data:any)=>{
        for(let i in data.currentorders){
            Orders[i]=data.currentorders[i]
        }
    })
    let AcceptOrder=async(order:any)=>{
        const resData={orderId:order.OrderId,ShopId:order.ShopId,clientId:order.ClientId}
        socket.emit('accept_order',resData)
        socket.emit('current_orders',(order.orderId))
        
    }
    let RejectOrder=async(order:any)=>{
        socket.emit('reject_order',{orderId:'',shopId:'',clientId:''})   
        socket.emit('current_orders',(order.orderId))
    }
    let DoneOrder=(order:any)=>{
        socket.emit('done_order',{orderId:'',shopId:'',clientId:''})
        socket.emit('current_orders',(order.orderId))
    }
    return(
      <div className="orders">
        <div>{Orders.map((order:any)=>{
            {if (order.status=='accept'){
            <div>
                <h3>{order.orderId}</h3>
                <h4>{order.details}</h4>
                <h5>{order.value}</h5>
                <h6>{order.status}</h6>
                <button type="submit" onClick={()=> DoneOrder(order)}></button>
            </div>
            }
            else{
                 <div>{neworders.map((order:any)=>{
                    <div>
                        <h3>{order.orderId}</h3>
                        <h4>{order.details}</h4>
                        <h5>{order.value}</h5>
                        <h6>{order.status}</h6>
                        <button type="submit" onClick={()=>AcceptOrder(order)}>Accept</button>
                        <button type="submit" onClick={()=>RejectOrder(order)}>Reject</button>
                    </div>
            })}</div>
            }}
        })}</div>
       
      </div>
    )
}*/
export default function Shop() {
    const [Orders, setOrders] = useState<any>([]);
    const socket = socketIOClient("ws://localhost:3200");
  
    useEffect(() => {
      let shopid=localStorage.getItem('id')
      socket.emit("myshop", (shopid));
      socket.on("current_orders", (currentorders: any) => {
        console.log('the current order',currentorders)
        setOrders(currentorders);
      });
      socket.on('new_order',(data)=>{
        console.log('aelole')
        socket.emit('new_order',(data))
      })
    }, []);
    const AcceptOrder = async (order: any) => {
      const reqData = {
        OrderId: order.OrderId,
        ShopId: order.ShopId,
        ClientId: order.ClientId
      };
      socket.emit("accept_order", reqData);
    };
  
    const RejectOrder = async (order: any) => {
      const reqData = {
        OrderId: order.OrderId,
        ShopId: order.ShopId,
        ClientId: order.ClientId,
      };
      socket.emit("reject_order", reqData);
    };
  
    const DoneOrder = (order: any) => {
      const reqData = {
        OrderId: order.OrderId,
        ShopId: order.ShopId,
        ClientId: order.ClientId,
      };
      socket.emit("done_order", reqData);
    };
  
    return (
      <div className="orders">
        {Orders.map((order: any) => {
          if (order.Status === "accept") {
            return (
              <div key={order.ΟrderId}>
                <h3>{order.ΟderId}</h3>
                <h4>{order.Details}</h4>
                <h5>{order.Value}</h5>
                <h6>{order.Status}</h6>
                <button type="submit" onClick={() => DoneOrder(order)}>Done</button>
              </div>
            );
          } else {
            return (
              <div key={order.OrderId}>
                <h3>{order.OrderId}</h3>
                <h4>{order.Details}</h4>
                <h5>{order.Value}</h5>
                <h6>{order.Status}</h6>
                <button type="submit" onClick={() => AcceptOrder(order)}>Accept</button>
                <button type="submit" onClick={() => RejectOrder(order)}>Reject</button>
                  
              </div>
            );
          }
        })}
      </div>
    );
  }
  