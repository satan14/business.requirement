require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app);
const auth = require('./middlewares/auth.mdw');

require('express-async-errors');
app.use(express.json());
app.use(cookieParser());
require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
app.use('/public', express.static('public'));


app.use('/auth', require('./routers/auth.router'));

app.get('/', function (req, res) {
    res.render('user/home');
});
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res) {
    res.render('errors/404', { layout: false });
})
app.use(function (err, req, res, next) {
    res.status(500).render('errors/404', { layout: false });
})
const PORT = process.env.PORT || 9000;
http.listen(PORT, () => {
    console.log(`start sever at port http://localhost:${PORT}`);
})
