import http from 'http';
import {Server} from 'socket.io'
import { Order,Shop,Client} from '../server/model/database.mjs';
import {Op} from 'sequelize'
import express from 'express'
import getOrders from './functions/getOrders.mjs';
import getClientSocket from './functions/getClientsocket.mjs'
const app=express()
const server = http.createServer(app);
const wss = new Server(server,{
  cors: {origin: "http://localhost:3000"}
});

  wss.on('connection', (ws) => {
    console.log('WebSocket connected Shop',ws.id);
    
    //sockets shop
    ws.on('myshop',(shopid)=>{
      //update table with ws.id
      console.log('mpike')
      try{
        console.log('aelara')
        Shop.update({Socketid:ws.id},{where:{Id:shopid}}).then((shop)=>{
        console.log(shop)
      })
      .catch(err=>{
        console.log(err.message)
      })
      
      Order.findAll({where:{[Op.and]: [{ ShopId: shopid},{Status:{[Op.in]:['accept','stand_by']}}]},order: [['updatedAt', 'DESC']]})
      .then((currentorders)=>{
        wss.emit('current_orders',currentorders)
      })
      .catch(err=>{
        console.log('edo exoume lathos',err.message)
      })
      
      }
      catch(error){
        console.log(error.message)
      }
    })
    ws.on('current_orders',(shopid)=>{
      const currentorders=getOrders(shopid)
      wss.emit('current_orders',currentorders)
    })
   
    ws.on('new_order',(data)=>{
      console.log('new-order')
      getOrders(data.ShopId)
      .then((currentorders)=>{
        wss.emit('current_orders',currentorders)
      })
    })
    
    ws.on('accept_order',(reqData)=>{
      try{
      Order.update({Status:'accept'},{where:{OrderId:reqData.OrderId }})
      console.log(`shop accept order and make it to delivery`)
      const resData={
        message:'shop accept order and make it to delivery',
        success:true,
        shopId:reqData.shopId,
        wsShop:ws.id,
        stage:'accept'
      }
      
      getClientSocket(reqData.ClientId)
      .then((client)=>{
        console.log('the ws.id:',client.Socketid) 
        wss.to(client.Socketid).emit('status_order',resData) 
      })
      getOrders(reqData.ShopId)
      .then((currentorders)=>{
          wss.emit('current_orders',currentorders)
      })
     
    }
    catch(error){
      console.log('sfalma',error.message)
      //wss.to(clientsocket).emit('status_order',{message:'sfalma',success:false})
    }
    })

    ws.on('reject_order',(reqData)=>{
      try{
        Order.update({Status:'reject'},{where:{OrderId:reqData.OrderId }})
        console.log(`the order rejected from shop`)
        const resData={
          message:'the order rejected from shop',
          success:true,
          shopId:reqData.shopId,
          wsShop:ws.id,
          stage:'accept'
        }
        
  
        getClientSocket(reqData.ClientId)
        .then((client)=>{
          console.log('the ws.id:',client.Socketid) 
          wss.to(client.Socketid).emit('status_order',resData) 
        })
        getOrders(reqData.ShopId)
        .then((currentorders)=>{
            wss.emit('current_orders',currentorders)
        })
       
      }
      catch(error){
        console.log('sfalma',error.message)
        //wss.to(clientsocket).emit('status_order',{message:'sfalma',success:false})
      }
    })

    ws.on('done_order',(reqData)=>{
      try{
        Order.update({Status:'done'},{where:{OrderId:reqData.OrderId }})
        console.log(`the order is ready and start to delivery to you`)
        const resData={
          message:'the order is ready and start to delivery to you',
          success:true,
          shopId:reqData.shopId,
          wsShop:ws.id,
          stage:'done'
        }
        
  
        getClientSocket(reqData.ClientId)
        .then((client)=>{
          console.log('the ws.id:',client.Socketid) 
          wss.to(client.Socketid).emit('status_order',resData) 
        })
        getOrders(reqData.ShopId)
        .then((currentorders)=>{
            wss.emit('current_orders',currentorders)
        })
       
      }
      catch(error){
        console.log('sfalma',error.message)
        //wss.to(clientsocket).emit('status_order',{message:'sfalma',success:false})
      }
    })

    //THE CLIENT CODE
    ws.on('create_order', (data) => {
      //update with socket id
      const client= Client.update({Socketid:ws.id},{where:{Id:data.ClientId}})
      if(!client){
          console.log('den prostethike to id')
      }
      Shop.findOne({where:{Id:data.ShopId}})
      .then((shop)=>{
        console.log('the socket id of shop',shop.Socketid)
        console.log('the socket id of client',ws.id)
        wss.to(shop.Socketid).emit('new_order',(data))
      })
      .catch(err=>{
        console.log('edo einai to sfalma',err.message)
      })
       
  });

    ws.on('disconnect',()=>{
      console.log('user disconnected',ws.id)
    })
  })
server.listen(3200,()=>{
    console.log('server listen to port:3100')
  })