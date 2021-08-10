import nc from 'next-connect'
import { allRooms, saveRoom } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
const handler = nc({onError});
import isAuthenticated, { authorize } from '../../../middlewares/auth'
dbConnect();

handler.get(allRooms);

handler.use(isAuthenticated,authorize('admin')).post(saveRoom)


export default handler;