import nc from 'next-connect'
import { checkBookedDates} from '../../../controllers/bookingController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});

dbConnect();



handler.get(checkBookedDates);


export default handler;
