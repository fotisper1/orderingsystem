import bodyParser from "body-parser";
import cors from 'cors'
import express from 'express'
import ClientRouter from "./routers/ClientRouter.mjs";
import ShopRouter from "./routers/ShopRouter.mjs";
const app= express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({origin: '*'}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use('/client',ClientRouter)
app.use('/shop',ShopRouter)

const port=process.env.PORT || 3001

app.listen(port,()=>{
    console.log('app listen to port:',port)
})