const express = require('express');
const router = express.Router();

const controller = require('./users-controller');

router.get('/', controller.getAllUsers);
router.get('/userid/:user_id', controller.getUserById);
router.get('/clerkid/:clerk_user_id', controller.getUserByClerkId);
router.get('/email/:email', controller.getUserByEmail);
router.post('/', controller.addUser);
router.put('/', controller.updateUser);
router.delete('/:user_id', controller.deactivateUser);

/* Registration */
/* Login */

module.exports = router;
