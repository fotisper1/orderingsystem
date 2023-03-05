import express from 'express'
const ShopRouter=express.Router()
import { getMyOrders,loginShop,registerShop } from '../Controllers/ShopController.mjs'
ShopRouter.get("/myorders",getMyOrders)
ShopRouter.get("/:shopid",)
ShopRouter.post("/register",registerShop)
ShopRouter.post("/login",loginShop)
//ShopRouter.get("/acceptorder",acceptOrder)
//ShopRouter.get("/sent",completeOrder)
//ShopRouter.get("/currentorders",currentOrders)
export default ShopRouter
