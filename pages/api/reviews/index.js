import nc from 'next-connect'
import {  createRoomReview, deleteReview, roomReviews } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from "../../../middlewares/auth"
const handler = nc({onError});
dbConnect();

// handler.get(allRooms);

handler.use(isAuthenticated).put(createRoomReview)
handler.use(isAuthenticated).delete(deleteReview)
handler.use(isAuthenticated).get(roomReviews)


export default handler;