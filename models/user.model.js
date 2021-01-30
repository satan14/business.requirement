const db = require('../utils/db');
const TBL_USERS = 'account';
module.exports = {
    signUp: async function(entity){
        db.add(TBL_USERS, entity);
    }
}