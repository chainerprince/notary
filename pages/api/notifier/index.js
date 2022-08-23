import nc from 'next-connect'
import { allNotifiers, saveNotifier } from '../../../controllers/notifierController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
const handler = nc({onError});
import isAuthenticated, { authorize } from '../../../middlewares/auth'
dbConnect();

handler.get(allNotifiers);

handler.use(isAuthenticated,authorize('admin')).post(saveNotifier)


export default handler;