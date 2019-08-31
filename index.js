const express = require('express');
const app = express();
//const mainControl = require('./controllers/mainControl.js');
const mongoose = require('mongoose');
const se = require('./modules/contact.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const formidable = require('formidable');
const adminrouters = require('./routers/adminrouters.js');
const clientrouters = require('./routers/clientrouters.js');

const MONGOLAB_URI = "mongodb+srv://yunlong:longlovesuomi810@cluster0-m2asn.mongodb.net/internetrover?retryWrites=true&w=majority";

const port = process.env.PORT || 8080;
//const localhost = 'mongodb://localhost:27017/internetRover';

app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:1000*60*10 },
  // store current user in database and max age:...
  store: new MongoStore({
    url: MONGOLAB_URI,
  }),
}));
app.use(function(req, res, next){
　　res.locals.user = req.session.user;
　　var err = req.session.error;
　　res.locals.message = '';
　　if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
　　next();
});

mongoose.connect(MONGOLAB_URI, { useNewUrlParser: true});

app.use('/admin', adminrouters);
app.use('/', clientrouters);
app.use(express.static('public'));

// Route not found (404)
app.use(function(req, res, next) {
   res.status(404).render('404');
});
// 500 - Any server error
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!Please contact admin@ yunlong.a.liu@gmail.com')
});

app.listen(port);
