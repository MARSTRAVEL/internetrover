const contact = require('../modules/contact.js');
const users = require('../modules/users.js');
const news = require('../modules/news.js');
const newsUpdateRecord = require('../modules/newsUpdateRecord.js');
const formidable = require('formidable');
const url = require('url');
const axios = require('axios');// Promise based HTTP client for the browser and node.js
const cheerio = require('cheerio'); // Basically jQuery for node.js
const scrapenews = require('./scrapenews.js');

const bbcUrl ='https://www.bbc.com/news';
const reutersUrl = 'https://www.reuters.com/news/archive/worldNews';
const yleUrl = "https://yle.fi/uutiset/osasto/news/";

exports.getlogin = function(req, res){
  req.session.user = null;
  res.render('login');
};

exports.postlogin = function(req, res){
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    users.find({'userName': fields.userName}, function(err, result){
      if (err) {
        res.send('server error!');
      }else if (result.length !== 0) {
         req.session.user = {
         username: fields.userName,
         password: fields.passWord,
        };
        res.redirect('index');
        return;
      }
      else {
        res.redirect('login');
      }
    });
    });
};

exports.showsignup = function(req, res){
  res.render('signup');
};

exports.postsignup = function(req, res){
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    const user = new users({
      userName : fields.userName,
      firstName: fields.firstName,
      lastName: fields.lastName,
      eMail: fields.eMail,
      passWord: fields.passWord,
      createdDate: Date.now(),
    });
    user.save(function(err){
      if (err) {
        res.send('error!');
      }else {
        res.render('login');
      }
    });
  });
};

exports.logout = function(req, res){
　　req.session.user = null;
　　req.session.error = null;
　　res.redirect('index');
};

exports.index = function(req, res){
  if (req.session.user) {
    res.render('index');
  }
  else {
    res.redirect('login');
  }
};

exports.dashboard = function(req, res){

  if (req.session.user) {
    // find lastest record/date and send to client
    newsUpdateRecord.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, result) {
      res.render('dashboard', {date: result.date});
    });

  }
  else {
    res.redirect('login');
  }
};

exports.dashboardNews = function(req, res){
// scrapenews and save  to db
  axios.all([axios.get(bbcUrl), axios.get(reutersUrl), axios.get(yleUrl)])
  .then(axios.spread(function(responseBBC, responseReuters, responseYle){
  const bbc =  scrapenews.bbcTopStory(responseBBC.data);
  const reuters = scrapenews.reuters(responseReuters.data);
  const yle = scrapenews.yleNews(responseYle.data);
  const allNews = [...bbc, ...reuters, ...yle];
  news.create(
  allNews,
  function(err, awesome_instance) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved!');
    }
  }
);
  }));

  req.on('data',function(data){
// get data(nowdate) from client and save to newsUpdateRecord db
 		dateNow =data.toString();
res.render('dashboard', {date: dateNow});
    const date = new newsUpdateRecord({
      date: dateNow,
    });

/*
    newsUpdateRecord.find({date: "2019728"},function(err, result){
      if (err) {
        console.log(err);
      }else {
        console.log(result);
      }
    });
*/
  date.save(function(err){
      if (err) {
        console.log(err);
      }else {
        console.log('saved!');
      }
    });

 	})
};

exports.showContact = function(req, res){
  if (req.session.user){
  res.render('contact', {});
  }
  else {
    res.redirect('login');
  }
}

exports.showAddContact = function(req, res){
  if (req.session.user) {
    res.render('addcontact', {});
  }else {
    res.redirect('login');
  }
};

exports.addNewContact = function(req, res){
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
       contact.addContact(fields, function(result){
         res.json({ 'result': result });
       });
    });
}
/*
// user make propfind request to check firstName exit or not
exports.validate = function(req, res){
  const firstName = req.params.firstName;
  console.log(req.params.firstName);
  contact.checkFirstName(firstName, function(trueOrFalse){
    res.json({'result': trueOrFalse});
  });
}
*/
// Ajax api to update contacts
exports.updateContact = function(req, res){
  const firstName = req.params.firstName;
// the form that server received from client
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    contact.find({'firstName': firstName}, function(err, results){
      if (results.length === 0) {
        res.send('-1');
        return;
      }
      const updateContact = results[0];
      updateContact.lastName = fields.lastName;
      updateContact.nationality = fields.nationality;
      updateContact.description = fields.description;
      updateContact.gender = fields.gender;

      updateContact.save(function(err){
        if (err) {
          res.json({'result': -1});
        }
        else {
          res.json({'result': 1});
        }
      });
    });

  });
}

exports.deletecontact = function(req, res){
  const firstName = req.params.firstName;
  // same as contact.checkFirstName() // static mathod
  contact.find({'firstName': firstName}, function(err, results){
    if (err || results.length === 0) {
      res.json({'result': -1});
      return;
    }

    results[0].remove(function(err){
      if (err) {
        res.json({'result': -1});
        return;
      }
    });
    res.json({'result': 1});
  });

}

// ajax api
exports.getAllContacts = function(req, res){
  const page = url.parse(req.url, true).query.url || 0;
  //limit(100) show 100 contacts at each time
  contact.find({}).limit(100).skip(2 * page).exec(function(err, results){
    res.json({'results': results});
  });
}

exports.showUpdate = function(req, res){
  const firstName = req.params.firstName;
  // same as contact.checkFirstName() // static mathod
  contact.find({'firstName': firstName}, function(err, results){
    if (results.length === 0) {
      res.send('Does not exit!')
      return;
    }
    res.render('updateContact',{
      info: results[0]
    });
  });
}

exports.shownews = function(req, res){
  news.find({}).sort({date:-1}).limit(20).exec(function(err, results){
    res.render('news', {message: results});
  });
//  res.render('news', {});
  /*
  if (req.session.user) {
    axios.all([axios.get(bbcUrl), axios.get(reutersUrl), axios.get(yleUrl)])
    .then(axios.spread(function(responseBBC, responseReuters, responseYle){
    const bbc =  scrapenews.bbcTopStory(responseBBC.data);
    const reuters = scrapenews.reuters(responseReuters.data);
    const yle = scrapenews.yleNews(responseYle.data);
    const allNews = [...bbc, ...reuters, ...yle];
    res.render('news', {message: allNews});
    }));
  }else {
    res.redirect('login');
  }
  */
};

exports.showWordCloud = function(req, res){
    res.render('wordcloud');
}
