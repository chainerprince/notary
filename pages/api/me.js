import nc from 'next-connect'

import {currentUser} from '../../controllers/authController';
import dbConnect from '../../config/dbConnect';
import onError from "../../middlewares/error";

import  isAuthenticated  from '../../middlewares/auth';
const handler = nc({onError});
dbConnect();



handler.use(isAuthenticated).get(currentUser)


export default handler;