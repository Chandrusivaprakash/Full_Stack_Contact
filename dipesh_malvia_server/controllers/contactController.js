const expressAsyncHandler = require("express-async-handler");
const Contact =require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
const getContacts=expressAsyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id})//user from validateToken data 
    res.status(200).json(contacts)
})

//@desc Create New contact
//@route GET /api/contact // get particular Id records
const getContact = expressAsyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id); 
    
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");//if error accor it send mes and status to erroHandler.js
      
    } else {
      res.status(200).json(contact); 
    }
  });

//@desc Create New contact
//@route POST /api/contacts
const createContact=expressAsyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact=await Contact.create({ 
        name, 
        email,
        phone,
        user_id:req.user.id //set user id to contact user_id . For this user create this contact
    })
      // user: {
      //   username: 'Shalini',
      //   email: 'shalini.com',
      //   id: '66ba046097b17c8c97414e04'
      // },
    res.status(201).json(contact)
})


//@desc update contact
//@route PUT /api/contacts/:id
const updateContact=expressAsyncHandler(async(req,res)=>{

    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    if (!contact) {
      res.status(404); 
      throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
      res.status(403)
      throw new Error("User don't have permission to Update other users contacts")
    }
      
      const updateContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
      )
    res.status(200).json(updateContact)
})

//@desc delete contact
//@route DELETE /api/contacts/:id
const deleteContact = expressAsyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    } 

    if(contact.user_id.toString() !== req.user.id){
      res.status(403)
      throw new Error("User don't have permission to Delete other users contacts")
    }
      await Contact.findByIdAndDelete(req.params.id)
      res.status(200).json(contact);
    

  });


module.exports={getContacts,getContact,createContact,updateContact,deleteContact}

//Controllers: Handle HTTP requests and responses, invoke services.
// controller is a set of functions that handle incoming HTTP requests and send responses back to the client.
// Controllers are JavaScript files that define methods to handle specific routes.
//Each function corresponds to an endpoint (route) and includes logic for handling that request, 
         //such as validating input, invoking business logic, interacting with models, and sending responses.

// 1.What are middleware function in Express.js ?
//    Middleware function are functions that execute during the request-response cycle , allowing for request 
//    modification ,logging ,etc          
   
//   2. What are some common security best practices for an Express.js application?
   
//    Use HTTPS, sanitize input, implement rate limiting, use helmet middleware for HTTP headers, and validate user input.

//    3. How do you perform CRUD operations in MongoDB?

// • CRUD operations (Create, Read, Update, Delete) are performed using methods like insertOne(), find(), updateOne(), and deleteOne()
   
    