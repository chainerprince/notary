import nc from 'next-connect'
import { allBookings } from '../../../../controllers/appointmentController'
import dbConnect from '../../../../config/dbConnect';
import onError from "../../../../middlewares/error";
import isAuthenticated, { authorize } from '../../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated,authorize('admin')).get(allBookings);




export default handler;