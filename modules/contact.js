const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  'firstName': String,
  'lastName': String,
  'nationality': String,
  'description': String,
  'gender': String,
});

// static method addContact
contactSchema.statics.addContact = function(json, callback){
  // check before addContact
  Contact.checkFirstName(json.firstName, function(trueOrFalse){
    if (trueOrFalse) {
      // if not exit, save and return Status 1
      const newContact = new Contact(json);
      newContact.save((err) => {
        if (err) {
          // server error
          callback(-2);
          return;
        }
      });
      callback(1);
    }else {
      // if already exit, return Status -1
      callback(-1);
    }
  });
};

// check firstName exit in database or not
contactSchema.statics.checkFirstName = function(firstName, callback){
  this.find({'firstName': firstName}, function(err, results){
    callback(results.length === 0);
  });
};

const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;
