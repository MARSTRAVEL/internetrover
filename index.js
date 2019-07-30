const express = require('express');
const app = express();
const mainControl = require('./controllers/mainControl.js');
const mongoose = require('mongoose');
const se = require('./modules/contact.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const formidable = require('formidable');
// const MONGOLAB_AMBER_URI = "mongodb+srv://heroku_8lmgrpq2:longlovesuomi810@cluster0-m2asn.mongodb.net/internetrover?retryWrites=true&w=majority";

const MONGOLAB_AMBER_URI = "mongodb://heroku_8lmgrpq2:longlovesuomi810@ds159631.mlab.com:59631/heroku_8lmgrpq2";
const port = process.env.PORT || 8080;
const localDB = 'mongodb://localhost:27017/internetRover';

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:1000*60*10 },
  // store current user in database and max age:...
  store: new MongoStore({
    url: process.env.MONGOLAB_AMBER_URI || localDB ,
  }),
}));
// const MONGO_URI = "mongodb+srv://yunlong:<longlovesuomi810>@cluster0-m2asn.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGOLAB_AMBER_URI || localDB, { useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(function(req, res, next){
　　res.locals.user = req.session.user;
　　var err = req.session.error;
　　res.locals.message = '';
　　if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
　　next();
});

app.get('/login', mainControl.getlogin);
app.post('/login', mainControl.postlogin);
app.get('/register', mainControl.showRegister);
app.post('/register', mainControl.postregister);
app.get('/logout', mainControl.logout);
app.get('/index', mainControl.index);
app.get('/dashboard', mainControl.dashboard);
app.post('/dashboard/news', mainControl.dashboardNews);
app.get('/contact', mainControl.showContact);  //show contact section
app.get('/addContact', mainControl.showAddContact); // show addContact form
app.post('/addNewContact', mainControl.addNewContact); // ajax send form to server and save form
// app.propfind('/:firstName', mainControl.validate); // ajax check firstName exit or not // app.propfind() check properties
app.delete('/contact/:firstName',   mainControl.deletecontact); // /: means receives parameteres
app.get('/contact/:firstName', mainControl.showUpdate);// show motified contact
app.post('/contact/:firstName',     mainControl.updateContact);
app.get('/allContacts', mainControl.getAllContacts);
// visit /news >> scrape >> show news; later on( first time visit /news >> scrape >> save to db >> show news)
app.get('/news', mainControl.shownews);
app.get('/wordcloud', mainControl.showWordCloud);

app.use(express.static('public'));

app.listen(port);
