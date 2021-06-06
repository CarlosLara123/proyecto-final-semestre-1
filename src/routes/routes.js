'use strict'

const express = require("express");
const nodemailer = require("nodemailer");
const contact = require("../model/contact");
const api = express.Router();


api.post('/send-email', async (req,res) => {
    const { name, email, asunto, message } = req.body;

    let contentHTML = `
        <h1>${name}</h1>
        <p>${message}</p>
    `;

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "claras@miumg.edu.gt", // generated ethereal user
            pass: "gflsrjgsexygvxae" // generated ethereal password
        }
    });


    let newContact = new contact();
    newContact.name = name;
    newContact.email = email;
    await newContact.save(async(err, storage)=>{
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `${email}`,
            to: 'claras@miumg.edu.gt',
            cc: `${email}`,
            subject: `${asunto}`,
            html: contentHTML
        }, async function (err, json) {
            if (err) console.log(`ERROR EN EL ENVÍO: ${err}`);
            if (json) console.log(`CORREO SE ENVIADO EXITOSAMENTE: ${json}`);
        });
    })

    return res.redirect('/');
})

module.exports = api;