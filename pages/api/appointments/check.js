import nc from 'next-connect'
import { checkNotifierAvailability, newBooking } from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});

dbConnect();



handler.get(checkNotifierAvailability);


export default handler;
