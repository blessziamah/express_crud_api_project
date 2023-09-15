const express = require("express")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router();
const {getContacts, updateContact, deleteContact, getContact, createContact} = require("../controllers/contactController")

router.use(validateToken)
router.route("/").get(getContacts).post(createContact)
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)

module.exports = router