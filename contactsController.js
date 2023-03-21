const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
// @desc get all contacts
// @route Get/api/contacts
//@access public 
const getContacts = asyncHandler(async (req, resp) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    // console.log(contacts[0].name);

    resp.status(200).json(contacts);
});

// @desc create all contacts
// @route Get/api/contacts
//@access public 
const createContact = asyncHandler(async (req, resp) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        resp.status(400);
        throw new Error("all fileds are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    resp.status(200).json(contact);
});

// @desc get  contacts
// @route Get/api/contacts/:id
//@access public 
const getContact = asyncHandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Contact not found");
    }
    resp.status(200).json(contact);
});

// @desc update contacts
// @route Get/api/contacts/:id
//@access public 
const updateContact = asyncHandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        resp.status(401);
        throw new Error("user hav't permission to upadate an contact");
    }
    const updateContact = await Contact.findOneAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    resp.status(200).json(updateContact);
});

// @desc delete contacts
// @route Get/api/contacts/:id
//@access public 
const deleteContact = asyncHandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        resp.status(401);
        throw new Error("user hav't permission to upadate an contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    resp.status(200).json({ message: `deleted contact for ${req.params.id}` });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };