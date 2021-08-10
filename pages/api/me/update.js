import nc from 'next-connect'
import { updateUser } from '../../../controllers/authController'
import dbConnect from '../../../config/dbConnect';
import onError from "../../../middlewares/error"
import isAuthenticated from '../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticated).put(updateUser)

handler.get((req,res)=>{
    res.json({
        success:"true",
        message:"the thing works"
    })
})
export default handler;