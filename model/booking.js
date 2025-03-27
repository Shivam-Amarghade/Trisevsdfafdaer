const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const BookingSchema=new Schema({
    Name:{
        type:String,
        require:true
    },
    Age:{
    type:Number,
    require:true
     },
    Guest:{
        type:Number,
        require:true,
    },
   
});
module.exports=mongoose.model("Booking",BookingSchema);