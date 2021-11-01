const sendGridMail = require('@sendgrid/mail');
require('dotenv').config();

module.exports.SendMail = (userList, sub, text, html) => {
    let receivers = "";
    userList.forEach((email) => receivers += email + ",");

    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
        to: receivers,
        from: ` ${process.env.USERNAME}  ${process.env.EMAIL}`,
        subject: sub,
        text: text,
        html: html
    };

    async () => {
        try {
            await sendGridMail.send(message);
        } catch (e) {
            console.log(e);

            if (e.response)
                console.error(e.response.body);
        }
    };
};