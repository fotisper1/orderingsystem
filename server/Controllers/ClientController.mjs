import { Order,Shop,Client} from "../model/database.mjs"
import bcrypt from 'bcrypt'

export const loginClient = async (req,res)=>{
  const username= req.body.onoma
  const userpassword= req.body.password
  try{
      if(!username || !userpassword){
         return res.status(401).json({message:'Λείπει το όνομα ή ο κωδικός του χρήστη', success:false})
      }
      let user= await Client.findOne({where:{Name:username}})
      if(user==null){
          res.status(404).json({message:'Δεν υπάρχει χρήστης με αυτό το όνομα',success:false})
          return true
      }
      else{
          const match = await bcrypt.compare(userpassword, user.Password)
          if(!match){
            res.status(401).json({message:'lathos kodikos prosvasis',success:false})
            return true
          }
          res.status(200).json({
            name:username,
            message:'syndethikes',
            success:true,
            id: user.Id
          })
          return 
      }
  }   
  catch(err){
      res.status(500).json({message:err.message,success:false})
  }
}
    

export const createOrder=async(req,res)=>{
    const client=req.body.clientid
    const orderdetail=req.body.details
    const shop=req.body.shopid
    const value=req.body.value
    console.log(client,orderdetail,shop,value)
    try{
        
        const newOrder = {
            Value: value,
            Details: orderdetail,
            Status: 'stand_by',
            ShopId: shop, // set the shop ID
            ClientId: client // set the client ID
          };
          
            Order.create(newOrder)
            .then(order => {
              console.log('New order created:', order);
              res.status(202).json({message:'i paraggelia kataxorithike me epityxia',order:order,success:true})
            })
            .catch(error => {
              console.error('Error creating new order:', error);
              res.status(400).json({message:error.message,success:false})
            });
       
            
        
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}
export const allShops=async(req,res)=>{
    try{
        let shops= await Shop.findAll()
        if(shops){
            res.status(200).json({shops:shops,success:true})
        }
        else{
            res.status(400).json({message:'den vrethikan shops, proekypse sfalma',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }

}
export const getAllOrders=async(req,res)=>{
    const userid=req.ClientId
    try{
        let orders= await Order.findAll({where:{ClientId:userid}})
        if(orders){
            res.status(200).json({orders:orders,success:true})
        }
        else{
            res.status(400).json({message:'den vrethikan paraggelies',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}

export const registerClient=async (req,res)=>{
    const onoma= req.body.name
    const passwordconfirm= req.body.password
    const adress=req.body.Address
    const email=req.body.email
    const informations=req.body.informations
    
    
    let existingClient= await Client.findOne({where:{Name:onoma}})
    console.log(existingClient)
    if(existingClient) {
        res.status(400).json({message:'auto to onoma yparxei ]idi',success:false})
        return true;
    }
    
    try{
        const hash = await bcrypt.hash(passwordconfirm, 10)
        let client= await Client.create({Name:onoma,Password:hash,Email:email,Address:adress,Informations:informations})
        console.log(client)
        res.status(201).json({client:client,success:true})
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}
