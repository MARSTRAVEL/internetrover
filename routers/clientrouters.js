const express = require('express')
const router = express.Router()
const clientcontrol = require('../controllers/clientcontrol.js');

router.get('/',clientcontrol.getindex);

router.get('/generatecv', clientcontrol.getgeneratecv);
router.post('/generatecv', clientcontrol.postcvform);

router.get('/cv', clientcontrol.getcv);

router.get('/wordcloud', clientcontrol.showWordCloud);

router.get('/news', clientcontrol.shownews);
router.post('/news', clientcontrol.postnews);

router.get('/dashboard', clientcontrol.dashboard);

router.get('/contact', clientcontrol.showContact);  //show contact section
router.get('/addContact', clientcontrol.showAddContact); // show addContact form
router.post('/addNewContact', clientcontrol.addNewContact); // ajax send form to server and save form
// app.propfind('/:firstName', mainControl.validate); // ajax check firstName exit or not // app.propfind() check properties
router.delete('/contact/:firstName', clientcontrol.deletecontact); // /: means receives parameteres
router.get('/contact/:firstName', clientcontrol.showUpdate);// show motified contact
router.post('/contact/:firstName', clientcontrol.updateContact);
router.get('/allContacts', clientcontrol.getAllContacts);

module.exports = router;
