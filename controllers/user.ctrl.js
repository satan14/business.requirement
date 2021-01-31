const userModel = require('../models/user.model');
const crypto = require ('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.KEY_SENDGRID);
const userCtl = {
    signUp: async function(req,res){
        var {fullName, birthday, email, phone,avatar} = req.body;
        const{filename} = req.file;
        var emailToken = crypto.randomBytes(36).toString('hex');
        let entity={
            fullName: fullName,
            email: email,
            avatar: filename,
            birthday: birthday,
            phone: phone,
            isVerified: false,
            emailToken: emailToken
        }
        const msg ={
            from: 'thongvo197@gmail.com',
            to: email,
            subject: 'Satan Club - Verify your Email to sign up',
            text: `Welcome to Satan Footbal Club.`,
            html: `<h1>Thank you for sign up manager position</h1>
                <p>Please click the link below to verify your email</p>
                <a href="http://${req.headers.host}/auth/listRegister?token=${emailToken}">Verify your email</a>
            `
        }
        try {
          const checkEmail = await userModel.findbyEmail(email);
          if(checkEmail.length>0){
            return res.json({err: "email existed!"});
          }else{
          const regist =  await userModel.signUp(entity);
          await sgMail.send(msg);
          return res.json(regist);
          }
          
        } catch (error) {
            console.log(error);
        }
    },
    verifyEmail: async function(req, res){
        let {token} = req.query;
        let entity ={
            isVerified: true
        }
        let condition ={
            emailToken: token
        }
        try {
            await userModel.updateIsVerified(entity,condition);
            let listAll = []
            listAll = await userModel.findIsVerified();
            for (let index = 0; index < listAll.length; index++) {
                if (listAll[index].birthday != null) {
                    let date = new Date(+listAll[index].birthday*1000);
                    let y = date.getFullYear();
                    let m = date.getMonth();
                    let d = date.getDate();
                    let time = d + '/' + (m+1) + '/' + y;
                    listAll[index].birthday = time;
                }
            }
            res.render('user/listRegister', {
                listAll
            })
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = userCtl;