import nc from 'next-connect'
import {  deleteBooking } from '../../../../controllers/appointmentController'
import dbConnect from '../../../../config/dbConnect';
import onError from "../../../../middlewares/error";
import isAuthenticated, { authorize } from '../../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated,authorize('admin')).delete(deleteBooking);

// handler.post(saveRoom)


export default handler;