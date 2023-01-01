import mongoose from 'mongoose'

const dbConnect = ()=>{
    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.LOCAL_DB_URL,{
        
        useNewUrlParser:true,
        useUnifiedTopology:true,

        useFindAndModify:false,
        useCreateIndex:true

    }).then(con=>console.log('Connected to db Successfully to the database'))

}
export default dbConnect; 