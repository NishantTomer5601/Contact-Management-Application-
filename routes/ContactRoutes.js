const express=require('express');
const router=express.Router();
const {getContact,getcontactwithid,CreateContact,UpdateContact,DeleteContact}=require("../controllers/contactControllers");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route("/").get(getContact);
router.route("/").post(CreateContact);
router.route("/:id").put(UpdateContact);
router.route("/:id").delete(DeleteContact);
router.route("/:id").get(getcontactwithid);
module.exports=router;