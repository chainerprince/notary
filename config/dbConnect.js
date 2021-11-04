import mongoose from 'mongoose'

const dbConnect = ()=>{
    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    }).then(con=>console.log('Connected to db Successfully'))
}

export default dbConnect;