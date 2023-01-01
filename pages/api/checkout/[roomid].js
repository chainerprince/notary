import nc from 'next-connect'
import { stripePayment } from '../../../controllers/paymentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'

const handler = nc({onError});

dbConnect();



handler.use(isAuthenticated).get(stripePayment);


export default handler;
