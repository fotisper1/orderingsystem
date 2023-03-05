import express from 'express'
import { allShops,getAllOrders,registerClient,createOrder,loginClient } from '../Controllers/ClientController.mjs'
const ClientRouter=express.Router()

ClientRouter.get("/allshops",allShops)
ClientRouter.get("/viewshop/:shopid")
ClientRouter.get("/myorders",getAllOrders)
ClientRouter.post("/register",registerClient)
ClientRouter.post("/createorder",createOrder)
ClientRouter.post("/login",loginClient)
export default ClientRouter

