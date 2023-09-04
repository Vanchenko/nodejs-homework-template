const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_APIKEY } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "info.kfresh@gmail.com" };
    await sgMail.send(email);
    return true;
}

module.exports = sendEmail;