import nc from 'next-connect'
import { userDetails, adminUpdateUser, deleteUser } from '../../../../controllers/authController'
import dbConnect from '../../../../config/dbConnect';
import onError from "../../../../middlewares/error";
import isAuthenticated, { authorize } from '../../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated,authorize('admin')).get(userDetails);
handler.use(isAuthenticated,authorize('admin')).put(adminUpdateUser);
handler.use(isAuthenticated,authorize('admin')).delete(deleteUser);




export default handler;