// jshint esversion:6
//====================================== requiring modules ===========================================//
// node modules
const bcrypt = require('bcryptjs');
const url = require(`url`);

// custom models
const user = require('../models/user.model');
const todo = require('../models/todo.model');

//================================== creating HTTP handler methods ==================================//
exports.home = (req, res) => { 
    res.render(__dirname + `/../views/home.views.ejs`);
};

exports.logIntoUserAccount = (req, res) => {
    // console.log(req.body);
    // simple user authentication
    user.findOne({email_address: req.body.email_address}, (err, docs) => {
        if(err){
            res.redirect(`/login`);
        }else{
            if(docs.password == req.body.password){                
                todo.find({user_id: docs._id}, (err, usertasks) => {
                    req.session.userId = docs._id;
                    if(err){
                    }else{
                        // res.send(usertasks);
                         res.render(__dirname + `/../views/dashboard.views.ejs`, {tasks: usertasks});
                    }
                 });
            }
        } 
    });
};

exports.createUserAccount = (req, res) => {
// console.log(req.body);
    if(req.body.password == req.body.confirm_password){
        user.create({
            name:req.body.full_name || null,
            phone_number: req.body.phone_number||null,
            email_address: req.body.email_address||null,
            password: req.body.password||null,
            date_of_birth :req.body.date_of_birth || null,
            gender:req.body.gender || null,
            photo_url: null
        }).then(() => {
            // todo add message that account creaation successful
            res.redirect('/dashboard');
        }).catch((err) => {
            res.send({err: `${err}`});
            res.send({msg: `User account creation failed 😫😫.`});
        });
    }else{
        res.redirect(`/signup`);
    }
};

exports.dashboard = (req, res) => { 
    todo.find({user_id: req.session.userId}, (err, usertasks) => {
        if(err){
        }else{
             res.render(__dirname + `/../views/dashboard.views.ejs`, {tasks: usertasks});
        }
     });
};