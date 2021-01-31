const db = require('../utils/db');
const TBL_USERS = 'account';
module.exports = {
    signUp: async function(entity){
       await db.add(TBL_USERS, entity);
    },
    findbyEmail: async function(email){
        return await db.load(`select * from ${TBL_USERS} a where a.email = "${email}"`);
    }
}