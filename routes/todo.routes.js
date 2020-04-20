// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = (app) => {
   const mtodo = require('../models/todo.model');
    const todo = require('../controllers/todo.controller');
    const user = require('../models/user.model');
    //========================================== app users routes ============================================//
   app.get(`/todopage`, (req, res) => {
      // todo add message that account creaation successful
      user.find({}, (err, docs) => {
         if (err) {
         }else{
            mtodo.find({}, (error, documents) => {
               console.log(documents);
               res.render(__dirname + `/../views/createtodo.views.ejs`, {users: docs, todos: documents});
            });
         }
      });
    });
    
    app.route(`/createTodo`)
       .post(todo.createTodoItemUsingId);

    app.route(`/readTodoItemsById/:userId`)
       .get(todo.readTodoItemsById);

    app.route(`/updateTodoItemsById`)
       .post(todo.updateTodoItemsById);

};
