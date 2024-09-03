const mongoose=require("mongoose")    

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add the user password"]
    }
},
{timestamps:true})

module.exports = mongoose.model("User",userSchema)

// timestamps is an option for the schema. It automatically adds createdAt and updatedAt fields to the schema,
//  which will store timestamps for when the document was created and last updated