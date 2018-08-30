var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  userID: 
  {
       type: Schema.Types.ObjectId,
       ref: '{ref}'
  },
  full_name: {
       type: String
  }
});

module.exports = mongoose.model('People',personSchema);