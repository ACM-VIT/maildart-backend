const express = require('express');
const { mailgun_mailer } = require('../../utils/mailer');
const sendgrid_mailer = require('../../utils/sendgrid');
const router = express.Router();

/** load the service */
const { UserController } = require('./user.controller');

/** to list all users */
router.get('/', async (req, res) => {
  const userList = await UserController.getAllUsers();
  return res.json(userList);
});

router.post('/mailgun', async(req,res) => {
  const userList = await UserController.getAllUsers();
  let subject = req.body.subject;
  let text = req.body.subject;
  let html = req.body.preview;

  await mailgun_mailer(userList, subject, text, html);
  res.sendStatus(200);
});

router.post('/sendgrid', async(req, res) => {
  const userList = await UserController.getAllUsers();
  await sendgrid_mailer.SendMail(userList, req.body.subject, req.body.text, req.body.html);
  res.sendStatus(200);
});

/** export the routes to be binded to application */
module.exports = router;
