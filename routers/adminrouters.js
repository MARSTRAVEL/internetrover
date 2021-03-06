const express = require('express')
const router = express.Router()
const admincontrol = require('../controllers/admincontrol.js');

router.get('/',admincontrol.adminindex);
router.get('/login',admincontrol.getlogin);
router.post('/login',admincontrol.postlogin);
router.get('/logout',admincontrol.logout);
router.get('/xiaogaogao',admincontrol.xiaogaogao);
router.get('/xiaogaogao/idp',admincontrol.idp);

router.get('/jobhunting',admincontrol.jobhunting);
router.post('/jobhunting',admincontrol.savejobhunting);

module.exports = router;
