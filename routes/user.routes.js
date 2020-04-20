// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = (app) => {
    const user = require('../controllers/user.controller');

    //========================================== app users routes ============================================//
    app.route('/home')
       .get(user.home);

   app.get(`/login`, (req, res) => {
      res.render(__dirname + `/../views/login.views.ejs`);
   });

   app.get(`/signup`, (req, res) => {
      res.render(__dirname + `/../views/signup.views.ejs`);
   });

   app.route(`/dashboard`)
      .get(user.dashboard);

   app.route(`/createNewUser`)
       .post(user.createUserAccount);

    app.route(`/logIntoUserAccount`)
       .post(user.logIntoUserAccount);

};
