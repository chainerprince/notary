import nc from 'next-connect'
import { deleteNotifier, singleNotifier,updateNotifier } from '../../../controllers/notifierController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"

import isAuthenticated, { authorize } from '../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.get(singleNotifier);

handler.use(isAuthenticated,authorize('admin','notifier')).put(updateNotifier);
handler.use(isAuthenticated,authorize('admin','notifier')).delete(deleteNotifier);

export default handler;