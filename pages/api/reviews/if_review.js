import nc from 'next-connect'
import {  canReview } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from "../../../middlewares/auth"
const handler = nc({onError});
dbConnect();

// handler.get(allRooms);

handler.use(isAuthenticated).get(canReview)


export default handler;