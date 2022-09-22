import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import User from '../../../models/user'
import dbConnect from '../../../config/dbConnect';


export default NextAuth({
    providers:[
        Providers.Credentials({
            session:{
                jwt:true
            },
            async authorize(credentials){
            
                    dbConnect();
                    const { email,password } = credentials;
                    if(!email || !password){
                        throw new Error('Please Enter Email or Password');
                    }

                    const user = await  User.findOne({email}).select("+password");
                    if(!user){
                        throw new Error('Invalid Email or Password');
                    }
                    const truePassword = await user.comparePassword(password);
                    if(!truePassword){
                        throw new Error("Invalid Email or Password")
                    }
                    return Promise.resolve(user);
            }
        })
    ],
    callbacks:{
        jwt:async(token,user)=>{
            user && (token.user = user);
            return Promise.resolve(token);
        },
        session:async(session,user)=>{
            session.user = user.user
            return Promise.resolve(session);
        }
    }
})