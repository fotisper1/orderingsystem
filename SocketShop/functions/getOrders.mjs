import { Order,Shop } from "../../server/model/database.mjs";
import sequelize from "../../server/model/config.mjs";
import {Op} from 'sequelize'
export default async function getOrders(shopid) {
    try {
      const currentOrders = await Order.findAll({
        where: {
          [Op.and]: [
            { ShopId: shopid },
            { Status: { [Op.in]: ['accept', 'stand_by'] } }
          ]
        },order: [['updatedAt', 'DESC']]
      });
      return currentOrders
    } catch (error) {
      console.log(error.message);
    }
  }
  