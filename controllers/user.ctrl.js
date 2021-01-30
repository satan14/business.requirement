const userModel = require('../models/user.model');
const crypto = require ('cripto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.KEY_SENDGRID);
const userCtl = {
    signUp: async function(req,res){
        var {fullName, birthday, email, phone} = req.body;
        var emailToken = crypto.randomBytes(64).toString('hex');
        var isVerified = false;
        const msg ={
            from: 'satan@email.com',
            to: email,
            subject: 'Satan Club - Verify your Email to sign up',
            html: `<h1>Thank you for sign up manager position<h1>
                <p>Please click the link below to verify your email<p>
                <a href="http://localhost9000/verify-email?token=${emailToken}>Verify your email<a>
            `
        }
        try {
          const verify =  await sgMail.send(msg);
        } catch (error) {
            
        }
        console.log(req.headers.host);
        console.log(req.file)
    },
    verifyEmail: async function(req, res){
        
    }
}
module.exports = userCtl;