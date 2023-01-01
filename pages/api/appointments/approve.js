import nc from 'next-connect'
import { approveAppointment} from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth';

const handler = nc({onError});

dbConnect();

handler.use(isAuthenticated).put(approveAppointment);

export default handler;
