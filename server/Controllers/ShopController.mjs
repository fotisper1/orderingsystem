import { Order,Shop} from "../model/database.mjs"
import bcrypt from 'bcrypt'
import { where } from "sequelize"
export const getMyOrders=async(req,res)=>{
    const shopId=req.body.shopId
    try{
        const orders=await Order.findAll({where:{ShopId:shopId}})
        if(orders){
            res.status(200).json({orders:orders,success:true})
        }
        else{
            res.status(400).json({message:'proekypse sfalma,den vrethikan paraggelies',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }

}
export const registerShop=async (req,res)=>{
    const onoma= req.body.name
    const passwordconfirm= req.body.password
    const adress=req.body.adress
    
    let existingshop= await Shop.findOne({where:{Name:onoma}})
    console.log(existingshop)
    if(existingshop) {
        res.status(400).json({message:'auto to onoma yparxei ]idi',success:false})
        return true;
    }
    
    try{
        const hash = await bcrypt.hash(passwordconfirm, 10)
        let shop= await Shop.create({Name:onoma,Password:hash,Address:adress})
        console.log(shop)
        res.status(201).json({shop:shop,success:true})
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}

export const loginShop = async (req,res)=>{
    const username= req.body.onoma
    const userpassword= req.body.password
    try{
        if(!username || !userpassword){
           return res.status(401).json({message:'Λείπει το όνομα ή ο κωδικός του χρήστη', success:false})
        }
        let user= await Shop.findOne({where:{Name:username}})
        console.log(user,username)
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
              id: user._id
            })
            return 
        }
    }   
    catch(err){
        res.status(500).json({message:err.message,success:false})
    }
  }