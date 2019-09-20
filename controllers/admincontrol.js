const formidable = require('formidable');
const ejs = require('ejs');
const Postblog = require('../modules/blog.js');
const jobhunting = require('../modules/admin/jobhunting.js');

exports.adminindex = async(req, res) =>{
  if (req.session.user) {
    const jobs = await jobhunting.find().sort({_id:-1});
    res.render('admin/index', {jobs});
  }else {
    res.redirect('admin/login');
  }
};

exports.jobhunting = function(req, res){
  if (req.session.user) {
  res.render('admin/jobhunting');
}else {
    res.redirect('admin/login');
}
};

exports.savejobhunting = function(req, res){
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    fields.result = 'pending';
    jobhunting.create(fields, function (err, awesome_instance) {
      if (err) console.log(err);
      res.redirect('/admin');
    });
  });
};

exports.getlogin = function(req, res){
    res.render('admin/login');
};

exports.logout = function(req, res){
  req.session.user = null;
  req.session.error = null;
  res.redirect('/admin/login');
};
exports.postlogin = function(req, res){
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(fields.userName.toLowerCase());
    if (fields.userName.toLowerCase() === "yunlong"&& fields.passWord ==="yunlong") {
      req.session.user = {
      username: fields.userName,
      password: fields.passWord,
     };
      res.redirect('/admin');
    }
    else {
      res.redirect('/admin/login');
    }
    });
};

exports.getpages = function(req, res){
  if (req.session.user) {
    res.render('admin/pages');
  }else {
    res.redirect('/admin');
  }
};
