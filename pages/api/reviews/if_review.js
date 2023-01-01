import nc from 'next-connect'
import {  canReview } from '../../../controllers/notifierController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from "../../../middlewares/auth"
const handler = nc({onError});
dbConnect();


handler.use(isAuthenticated).get(canReview)


export default handler;