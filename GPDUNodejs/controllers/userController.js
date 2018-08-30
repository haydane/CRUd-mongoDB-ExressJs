const userModel = require('../model/userModel');

module.exports =
{
     save: (newUser,callBakc) => {
          newUser.save(callBakc);  
     },
     find: (callback) => {
          userModel.find(callback);
     }
}