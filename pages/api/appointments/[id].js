import nc from 'next-connect'
import { bookingDetails } from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});

dbConnect();



handler.use(isAuthenticated).get(bookingDetails);


export default handler;
