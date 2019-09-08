const formidable = require('formidable');
const ejs = require('ejs');
const Postblog = require('../modules/blog.js');

exports.getlogin = function(req, res){
    res.render('admin/login');
};

exports.postlogin = function(req, res){
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (fields.userName === "admin"&& fields.passWord ==="admin") {
      req.session.user = {
      username: fields.userName,
      password: fields.passWord,
     };
      res.redirect('admin/index');
    }
    else {
      res.redirect('/admin');
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



exports.writeblog = function(req, res){
  res.render('admin/writeblog');
};

exports.storepost = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    fields.date = new Date().toLocaleString();
    Postblog.create(fields, function (err, awesome_instance) {
      if (err) console.log(err);
      res.redirect('/admin/blog');
    });
  });
};
