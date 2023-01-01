import nc from 'next-connect'
import { checkBookedDates} from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"

const handler = nc({onError});

dbConnect();



handler.get(checkBookedDates);


export default handler;
