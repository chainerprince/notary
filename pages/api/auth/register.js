import nc from 'next-connect'
// import { allRooms, saveRoom } from '../../../controllers/roomController'
import {registerUser} from '../../../controllers/authController';
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error";
const handler = nc({onError});
// import upload from '../../../middlewares/fileUpload'

dbConnect();

// handler.get(allRooms);


handler.post(registerUser)
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
  }
export default handler;

