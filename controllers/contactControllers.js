const asynchandler=require("express-async-handler");
const Contact=require("../models/contactModels");

//we would be writing the logic for all the processes of getting and uploading contact.


const getContact=asynchandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json({contacts});
});

//GET  CONTACT with id
const getcontactwithid=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        //res.status(404);
        throw new Error("Contact not found");
    }
    
        res.status(200).json(contact);
    

});

// CREATE CONTACT
const CreateContact=asynchandler(async(req,res)=>{
    console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//UPDATE CONTACT
const UpdateContact=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.send.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }



    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

// DELETE CONTACT:

const DeleteContact=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }


    await Contact.deleteOne({ _id: req.params.id });;   
    res.status(200).json(contact);
    
});


module.exports={getContact,getcontactwithid,CreateContact,UpdateContact,DeleteContact};