const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');
var objectId = require('mongodb').ObjectID;
const userController = require('../controllers/userController');
const postModel = require('../model/postModel');
const moment = require('moment');

router.get('/', (req, res, next) => {
    userModel.find((err, user) => {
        res.render('index', {
            users: user,
        });
    })
});

router.get('/:id',(req,res) => {
    id = req.params.id;
    postModel.find({userID: objectId(id)}).sort({datetime: -1}).exec((err, post) => {
        res.render('posts', {
            posts: post,
            moment: moment,
            
    })
    });
});

// save new user
router.post('/new-user', (req, res) => {
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
        // var newPerson = new personModel({ userID: user._id, 'full_name': 'Hay Dane' });
        // snewPerson.save();

        req.flash('success_msg', 'saved');
        res.redirect('/');
    });

});

// update user
router.post('/update-user', (req, res) => {
    var id = req.body.id;
    userModel.findOne({ _id: objectId(id) }, (err, user) => {
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

        user.username = req.body.username ? req.body.username : user.username;
        user.password = req.body.password ? req.body.password : user.password;


        user.save((err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        })
        req.flash('success_msg', 'updated');
        res.redirect('/');
        // userModel.updateOne({ _id: objectId(id) }, { $set: {username,password}}, (err, result) => {
        //     if (err) {
        //         res.send(500).json({
        //             message: 'ERROR',
        //             error: err
        //         });
        //     }
        //     if (!result) {
        //         res.send(404).json({
        //             message: 'not found',
        //         })
        //     }
        //     else {
        //         console.log(result);
        //     }

        // });
    });
});

// delete user 
router.post('/delete-user', (req, res) => {
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
    req.flash('success_msg', 'deleted');
    res.redirect('/');
});

module.exports = router;