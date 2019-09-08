const express = require('express')
const router = express.Router()
const admincontrol = require('../controllers/admincontrol.js');

router.get('/',admincontrol.getlogin);

router.post('/', admincontrol.postlogin);

router.get('/pages', admincontrol.getpages);


router.get('/writeblog', admincontrol.writeblog);
router.post('/storepost', admincontrol.storepost);

router.get('/index', function(req, res){
  res.render('admin/index');
});


module.exports = router;
