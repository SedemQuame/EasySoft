// jshint esversion:6
//====================================== requiring modules ===========================================//
// node modules


// custom models
const user = require('../models/user.model');
const todo = require('../models/todo.model');

//================================== creating HTTP handler methods ==================================//
exports.createTodoItemUsingId = (req, res) => {
    console.log(req.body);
    todo.create({
        title:req.body.title || null,
        description: req.body.description||null,
        start_time: req.body.start_time||null,
        deadline: req.body.deadline||null,
        user_id :req.body.employeeId || null,
        status: "pending",
    }).then(() => {
        // todo add message that account creaation successful
        user.find({}, (err, docs) => {
            if (err) {
            }else{
                res.render(__dirname + `/../views/createtodo.views.ejs`, {users: docs});
            }
        });
    }).catch((err) => {
        res.send({err: `${err}`});
        res.send({msg: `Todo item creation failed 😫😫.`});
    });
};

exports.readTodoItemsById = (req, res) => {
    todo.find({id: req.params.userId}, (err, docs) => {
        if(err){
        }else{
            // console.log(docs);
             res.render(__dirname + `/../views/dashboard.views.ejs`, {tasks: docs});
        }
     }); 
};

exports.updateTodoItemsById = (req, res) => {
    console.log(req.body);
    todo.findByIdAndUpdate(req.body.taskId, { status: 'Completed' }, (err, doc) => {
        if (err) {
        }else{
            res.redirect(`/dashboard`);
        }
    } );
    
};

