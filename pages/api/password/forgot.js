import nc from 'next-connect'
import { forgotPassword } from '../../../controllers/authController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.post(forgotPassword)


export default handler;