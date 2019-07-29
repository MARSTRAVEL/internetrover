const mongoose = require('mongoose');
const newsUpdateRecord = new mongoose.Schema(
  {
    'date': String,
  }
);

newsUpdateRecord.statics.checkDate = function(date){
  this.find({'date': date}, function(err, results){
    if (err) {
      console.log(err);
    }else {
      console.log(results);
    }
  });
};

module.exports = mongoose.model('newsUpdateRecord', newsUpdateRecord);
