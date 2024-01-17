const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name:{
        type: String,
        required:[true," Please Add contact name"],
    },
    email:{
        type: String,
        required:[true," Please Add email id"],
    },
    phone:{
        type: String,
        required:[true," Please Add contact number"],
    }
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("Contact",contactSchema);