const express = require('express')
const router = express.Router()
const admincontrol = require('../controllers/admincontrol.js');

router.get('/',admincontrol.adminindex);
router.get('/login',admincontrol.getlogin);
router.post('/login',admincontrol.postlogin);

router.get('/jobhunting',admincontrol.jobhunting);
router.post('/jobhunting',admincontrol.savejobhunting);

router.post('/', admincontrol.postlogin);

router.get('/pages', admincontrol.getpages);

router.get('/index', function(req, res){
  res.render('admin/index');
});


module.exports = router;
