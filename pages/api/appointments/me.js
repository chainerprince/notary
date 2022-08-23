import nc from 'next-connect'
import { myBookings } from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});

dbConnect();



import nc from 'next-connect'
import { checkBookedDates} from '../../../controllers/appointmentController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"

const handler = nc({onError});

dbConnect();



handler.get(checkBookedDates);


export default handler;



export default handler;
