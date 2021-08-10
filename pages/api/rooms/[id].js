import nc from 'next-connect'
import { deleteRoom, singleRoom,updateRoom } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"

import isAuthenticated, { authorize } from '../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.get(singleRoom);

handler.use(isAuthenticated,authorize('admin')).put(updateRoom);
handler.use(isAuthenticated,authorize('admin')).delete(deleteRoom)



export default handler;