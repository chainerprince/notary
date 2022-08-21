const Room = require("../models/rooms");
const rooms = require('../data/rooms');


console.log(rooms)

const  mongoose  = require("mongoose");


mongoose.connect("mongodb+srv://admin:bookit@bookit.v9kl4.mongodb.net/bookit?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(con=>console.log('Connected to db Successfully')).catch(err=>console.log(err))


const seedRooms = async(req,res)=>{
    try {
        await Room.deleteMany();
        console.log("Rooms deleted")
        await Room.insertMany(rooms);
        console.log("Rooms added to The system");
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedRooms();