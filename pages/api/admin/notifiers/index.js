import nc from 'next-connect'
import { allAdminNotifiers, } from '../../../../controllers/notifierController'
import dbConnect from '../../../../config/dbConnect';
import onError from "../../../../middlewares/error";
import isAuthenticated, { authorize } from '../../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated,authorize('admin')).get(allAdminNotifiers);



export default handler;