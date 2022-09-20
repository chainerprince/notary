import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error";
import isAuthenticated, { authorize } from '../../../middlewares/auth'
import { notifierBookings } from '../../../controllers/appointmentController';
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated,authorize('notifier')).get(notifierBookings);
export default handler;