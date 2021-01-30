const userModel = require('../models/user.model');
const userCtl = {
    signUp: async function(req,res){
        console.log(req.body);
        console.log(req.file)
    }
}
module.exports = userCtl;