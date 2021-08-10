const Room = require("../models/rooms");
const rooms = require('../data/rooms');




const  mongoose  = require("mongoose");


mongoose.connect("mongodb://localhost:27017/bookit",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(con=>console.log('Connected to db Successfully'))


const seedRooms = async(req,res)=>{
    try {
        await Room.deleteMany();
        console.log("Rooms deleted")
        await Room.insertMany(rooms);
        console.log("Rooms added to The system");
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedRooms();