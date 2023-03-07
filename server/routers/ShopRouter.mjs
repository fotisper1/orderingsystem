import express from 'express'
const ShopRouter=express.Router()
import { getMyOrders,loginShop,registerShop } from '../Controllers/ShopController.mjs'
ShopRouter.get("/lastorders/:shopid",getMyOrders)
ShopRouter.post("/register",registerShop)
ShopRouter.post("/login",loginShop)
export default ShopRouter
