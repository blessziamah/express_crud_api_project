const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find({user_id: req.user.id})
	res.status(200).json({contacts})
})

//@desc Create contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
	const {name, email, phone} = req.body;
	if(!name || !email || !phone) {
		res.status(400);
		throw new Error("All fiels are mandatory")
	}

	const contact = await Contact.create({
		name, email, phone, user_id: req.user.id,
	})
	res.status(201).json(contact)
	console.log(req.body)
})

//@desc Get contact
//@route Get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id)
	if(!contact) {
		res.status(404)
		throw new Error("Contact Not Found")
	}
	else {
		res.status(200).json({contact})
	}
})

//@desc update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
	
	const contact = await Contact.findById(req.params.id)
	if(!contact) {
		res.status(404)
		throw new Error("Contact Not Found")
	}
	else if(contact.user_id.toString() != req.user.id) {
		res.status(403)
		throw new Error("User not permitted to update this contact")
	}
	else {
		const updatedContact = await Contact.findByIdAndUpdate (
			req.params.id, req.body, {new:true}
		)
		res.status(200).json({updatedContact})
	}
	
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}  
	
	if(contact.user_id.toString() != req.user.id) {
		res.status(403)
		throw new Error("User not permitted to update this contact")
	}
	
	await contact.remove({ _id: req.params.id });
	res.status(200).json(contact);
});



module.exports = {getContact, createContact, getContacts, updateContact, deleteContact}
