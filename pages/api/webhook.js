import nc from 'next-connect'

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
console.log("The hook checkout that is working given something")
handler.post(hookCheckout)


export default handler;