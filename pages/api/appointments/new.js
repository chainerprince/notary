import nc from 'next-connect'
import { newBooking} from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth';

const handler = nc({onError});

dbConnect();



handler.use(isAuthenticated).post(newBooking);

export default handler;
