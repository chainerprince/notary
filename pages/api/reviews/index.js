import nc from 'next-connect'
import {  createNotifierReview, deleteReview, notifierReviews } from '../../../controllers/notifierController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from "../../../middlewares/auth"
const handler = nc({onError});
dbConnect();
handler.use(isAuthenticated).put(createNotifierReview)
handler.use(isAuthenticated).delete(deleteReview)
handler.use(isAuthenticated).get(notifierReviews)


export default handler;