import {model,Schema,models} from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
const userSchema = new Schema({
         name:{
             type:String,
             required:[true,"Please enter your name"],
             maxLenght: [50,"We don't accept names longer than 50 characters"],
             
         },
         email:{
             type:String,
             required:[true,"Please enter your email"],
             unique:[true,'This email is already registered'],
             validate:[validator.isEmail,"Please enter a valid Email"]

         },
         password:{
             type:String,
             required:[true,"Please enter your password"],
             
             select:false,
             minLength: [6,"Password must be more than 6 characters"],

         },
         avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
         role:{
             type:String,
             default:"user"
         },
         createAt:{
             type:Date,
            default:Date.now
         },
         resetPasswordToken:String,
         resetPasswordExpire:Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,8);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


userSchema.methods.getPasswordToken = function(){
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordExpire = Date.now() + 30*3600;
    return token;
}

export default models.User || model('User',userSchema); 