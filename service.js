require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('express-async-errors');
app.use(express.json());
// set layout
require('./middlewares/view.mdw')(app);
// public folder
app.use('/public', express.static('public'));
// Route
app.use('/auth', require('./routers/auth.router'));
app.get('/', function (req, res) {
    res.render('user/home');
});
// Error Page
app.use(function (req, res) {
    res.render('errors/404', { layout: false });
})
app.use(function (err, req, res, next) {
    res.status(500).render('errors/404', { layout: false });
})
const PORT =  9000;
http.listen(PORT, () => {
    console.log(`start sever at port http://localhost:${PORT}`);
})
