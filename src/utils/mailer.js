const nodemailer = require('nodemailer')
require('dotenv').config()

function concatenatEmails ( emailArray ){
    /*
        Iterate over email array and concatenate with previous string
    */
    let emails = ""
    emailArray.forEach((email) => emails += email + ",")
    return emails 
}

async function mailer ( recipientEmailArray, subject, text, html ){
    try {
        // Create a Concatenated String for merging email in a single string
        let mergedEmail = concatenatEmails (recipientEmailArray)
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: ` ${process.env.USERNAME}  ${process.env.EMAIL}`, // sender address
            to: mergedEmail, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (e) {
        console.log(e);
    }
}

exports = mailer ; 