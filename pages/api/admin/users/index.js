import nc from 'next-connect'
import { allUsers } from '../../../../controllers/authController'
import dbConnect from '../../../../config/dbConnect';
import onError from "../../../../middlewares/error";
import isAuthenticated, { authorize } from '../../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated,authorize('admin')).get(allUsers);




export default handler;