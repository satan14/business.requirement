const db = require('../utils/db');
const TBL_USERS = 'account';
module.exports = {
    signUp: async function(entity){
       await db.add(TBL_USERS, entity);
    },
    findbyEmail: async function(email){
        return await db.load(`select * from ${TBL_USERS} a where a.email = "${email}"`);
    },
    findIsVerified: async function(){
        return await db.load(`select * from ${TBL_USERS} a where a.isVerified = true`);
    },
    updateIsVerified: async function(entity, condition){
        await db.patch(TBL_USERS,entity,condition);
    }
}