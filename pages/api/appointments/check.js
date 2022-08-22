import nc from 'next-connect'
import { checkRoomAvailability, newBooking } from '../../../controllers/bookingController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});

dbConnect();



handler.get(checkRoomAvailability);


export default handler;
