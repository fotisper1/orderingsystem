import { Order,Client } from "../../server/model/database.mjs";
export default async function getClientSocket(clientid){
    try{
        const client= await Client.findOne({where:{Id:clientid}})
        return client
    }
    catch(err){
        console.log(err.message)
    }
}