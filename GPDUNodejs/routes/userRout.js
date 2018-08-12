const express = require('express');
const rout = express.Router();
const userModel = require('../model/userModel');
var objectId = require('mongodb').ObjectID;
const userController = require('../controllers/userController');

rout.get('/', (req, res, next) => {
    userModel.find((err, user) => {
        res.render('index', {
            users: user,
        });
    })
});

// save new user
rout.post('/new-user', (req, res) => {
    let {
        username,
        password
    } = req.body;

    let newUser = new userModel({
        username,
        password
    });

    userController.save(newUser, (err, user) => {
        console.log(user);
    });
    res.redirect('/')
});

// update user
rout.post('/update-user', (req, res) => {
    var id = req.body.id;
    userModel.findOne({ _id: objectId(id) },  (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error saving user',
                error: err
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'No such user'
            });

        }

        var username = user.username = req.body.username ? req.body.username : user.username;
        var password = user.password = req.body.password ? req.body.password : user.password;
        
        userModel.updateOne({ _id: objectId(id) }, { $set: {username,password}}, (err, result) => {
            if (err) {
                res.send(500).json({
                    message: 'ERROR',
                    error: err
                });
            }
            if (!result) {
                res.send(404).json({
                    message: 'not found',
                })
            }
            else {
                console.log(result);
            }

        });
        res.redirect('/');
    });
});

// delete user 
rout.post('/delete-user', (req, res) => {
    var id = req.body.id;
    userModel.deleteOne({ _id: objectId(id) }, (err, result) => {
        if (err) {
            res.send(500).json({
                message: 'ERROR',
                error: err
            });
        }
        if (!result) {
            res.send(404).json({
                message: 'not found',
            })
        }
        else {
            console.log(result);
        }

    });
    res.redirect('/');
});

module.exports = rout;