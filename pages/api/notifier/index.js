import nc from 'next-connect'
import { allNotifiers, saveNotifier } from '../../../controllers/notifierController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import cors from 'cors'
const handler = nc({onError});
dbConnect();
var corsOptions = {
  origin: function (origin, callback) {
    
    
      callback(null, true)
    
  }
}

handler.use(cors(corsOptions)).get(allNotifiers);

handler.post(saveNotifier)


export default handler;