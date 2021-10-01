const express = require('express');

const router = express.Router();

/** load the service */
const { UserController } = require('./user.controller');

/** to list all users */
router.get('/', async (req, res) => {
  const userList = await UserController.getAllUsers();
  return res.json(userList);
});

/** export the routes to be binded to application */
module.exports = router;
