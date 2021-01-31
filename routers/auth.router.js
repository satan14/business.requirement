const router = require('express').Router();
const auth = require('../middlewares/auth.mdw');
const multer = require('multer');
const userCtl = require('../controllers/user.ctrl')
const upload = multer({
    dest: 'public/img/avatar'
});
router.post('/signUp',upload.single('avatar'), userCtl.signUp);
router.get('/listRegister', userCtl.verifyEmail);
module.exports = router;