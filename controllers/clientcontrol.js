const contact = require('../modules/contact.js');
const users = require('../modules/users.js');
const news = require('../modules/news.js');
const Postblog = require('../modules/blog.js');
const newsUpdateRecord = require('../modules/newsUpdateRecord.js');
const formidable = require('formidable');
const url = require('url');
const axios = require('axios');// Promise based HTTP client for the browser and node.js
const cheerio = require('cheerio'); // Basically jQuery for node.js
const scrapenews = require('./scrapenews.js');
const ejs = require('ejs');
const fs = require('fs');

const bbcUrl ='https://www.bbc.com/news';
const reutersUrl = 'https://www.reuters.com/news/archive/worldNews';
const yleUrl = "https://yle.fi/uutiset/osasto/news/";


exports.getindex = function(req, res){
  res.setHeader('Cache-Control', 'public, max-age=3000');
  res.render('client/index');
  };
exports.blobuzzer = function(req, res){
  res.render('gb/globuzzerLandingPage.html');
}
exports.thesis = function(req, res){
  res.setHeader('Cache-Control', 'public, max-age=3000');
  res.render('client/thesis');
  };

exports.getgeneratecv = function(req, res){
  res.render('client/generatecv');
};

const processCvData = (fields) =>{
  let data ={};
  data.firstName = fields.firstName;
  data.lastName = fields.lastName;
  data.phone = fields.phone;
  data.eMail = fields.eMail;

  if (typeof fields.link === 'string') {
    data.link=[fields.link];
    data.linkLable = [fields.linkLable];
  } else {
    data.link=fields.link;
    data.linkLable = fields.linkLable;
  }
  if (typeof fields.languageLable ==='string') {
    data.languageLable = [fields.languageLable];
    data.languageLevel = [fields.languageLevel];
  }
  else {
    data.languageLable = fields.languageLable;
    data.languageLevel = fields.languageLevel;
  }
  if (typeof fields.interestLable ==='string') {
    data.interestLable = [fields.interestLable];
  }else {
    data.interestLable = fields.interestLable;
  }
  if (typeof fields.experienceLable ==='string') {
    data.experienceLable = [fields.experienceLable];
    data.experiencePeriod = [fields.experiencePeriod];
    data.experienceDescription = [fields.experienceDescription];
  }else {
    data.experienceLable = fields.experienceLable;
    data.experiencePeriod = fields.experiencePeriod;
    data.experienceDescription = fields.experienceDescription;
  }
  if (typeof fields.projectLable === 'string') {
    data.projectLable = [fields.projectLable];
    data.projectDescription = [fields.projectDescription];
    data.projectLink = [fields.projectLink];
  }else {
    data.projectLable = fields.projectLable;
    data.projectDescription = fields.projectDescription;
    data.projectLink = fields.projectLink;
  }
  if (typeof fields.educationPeriod === 'string') {
    data.educationPeriod = [fields.educationPeriod];
    data.instituionName = [fields.instituionName];
    data.major = [fields.major];
  }else {
    data.educationPeriod = fields.educationPeriod;
    data.instituionName = fields.instituionName;
    data.major = fields.major;
  }
return data;
}
exports.postcvform = function(req, res){
  const form = new formidable.IncomingForm();
  //form.uploadDir = "./public/temPictures";
//  form.keepExtensions = true;
//  form.keepFilenames = true;
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
    }
    else {
      const data = processCvData(fields);
/*
      data.profilePhoto = files.profilePhoto.name;
      fs.rename(files.profilePhoto.path, form.uploadDir + "/" + files.profilePhoto.name, function(err){
        if (err) {
          console.log(err);
        }
        return;
      });
*/
      res.render('client/cvtemplate', {cvdetailes: data});
    }
  });
};

exports.getcv = function(req, res){res.render('client/cv');};

exports.showWordCloud = function(req, res){
    res.render('client/wordcloud');
};

exports.shownews = function(req, res){
  news.find({}).sort({date:-1}).limit(20)
  .then(results =>{
    newsUpdateRecord.findOne().sort({date:-1}).limit(1)
    .then((time)=>{
      res.render('client/news',{
        message: results,
        updated_date:time.date
      });
    })
  })
};
exports.postnews = function(req, res){
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
        console.log(' news saved!');
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
          console.log(' time saved!');
        }
      });

   	})
  };

exports.dashboard = function(req, res){
  res.render('client/dashboard');
};

exports.showContact = function(req, res){
    res.render('client/contact/contact', {});
  };
exports.showAddContact = function(req, res){
      res.render('client/contact/addcontact', {});
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
      res.render('client/contact/updateContact',{
        info: results[0]
      });
    });
  }

exports.blog = async(req, res) => {
  const posts = await Postblog.find({});
  res.render('client/blog/blog', {posts});
};

exports.showsinglepost = async(req, res) => {
  const posts = await Postblog.findById(req.params.id);
  res.render('client/blog/signlepost', {posts});
};

exports.writeblog = function(req, res){
  res.render('client/blog/writeblog');
};

exports.storepost = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    fields.date = new Date().toLocaleString();
    Postblog.create(fields, function (err, awesome_instance) {
      if (err) console.log(err);
      res.redirect('/blog');
    });
  });
};


exports.about = function(req, res){
  res.render('client/about');
};

/*
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
*/
