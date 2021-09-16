import nc from 'next-connect'
// import { allRooms, saveRoom } from '../../../controllers/roomController'
import {hookCheckout} from '../../controllers/paymentController';
import dbConnect from '../../config/dbConnect';
import onError from "../../middlewares/error";

import  isAuthenticated  from '../../middlewares/auth';
const handler = nc({onError});
dbConnect();


export const config = {
    api:{
        bodyParser:false
    }
}
// handler.get(allRooms);

handler.use(isAuthenticated).post(hookCheckout)


export default handler;