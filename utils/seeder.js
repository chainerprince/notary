const Notifier = require("../models/notifiers");
const Notifiers = require('../data/notifiers');


console.log(Notifiers)

const  mongoose  = require("mongoose");


mongoose.connect("mongodb+srv://admin:bookit@bookit.v9kl4.mongodb.net/bookit?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(con=>console.log('Connected to db Successfully')).catch(err=>console.log(err))


const seedNotifiers = async(req,res)=>{
    try {
        await Notifier.deleteMany();
        console.log("Notifiers deleted")
        await Notifier.insertMany(Notifiers);
        console.log("Notifiers added to The system");
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedNotifiers();