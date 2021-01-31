const router = require('express').Router();
const multer = require('multer');
const userCtl = require('../controllers/user.ctrl')
const upload = multer({
    dest: 'public/img/avatar'
});
router.post('/signUp',upload.single('avatar'), userCtl.signUp); //use upload to change file name of picture to string and save public.
router.get('/listRegister', userCtl.verifyEmail);
module.exports = router;