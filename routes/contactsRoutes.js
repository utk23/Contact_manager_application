const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../Controllers/contactsController');
const validateToken = require("../middleware/validateTokenHandle");


router.use(validateToken); // iss command se sare routes validate token pr jayenge aur token ko validate krenge
router.route('/').get(getContacts);

router.route('/').post(createContact);

router.route('/:id').get(getContact);

router.route('/:id').put(updateContact);


router.route('/:id').delete(deleteContact);


module.exports = router;