const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = Schema({
     userID:
     {
        type : Schema.Types.ObjectId,
        ref : '{ref}'
     },
     status:
     {
          type: String
     },
     datetime: {
          type: String,
          default: Date.now
     }
});

module.exports = mongoose.model('Posts',PostSchema);