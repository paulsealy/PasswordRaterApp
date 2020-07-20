module.exports = (app) => {
    const user = require('../controller/users.controller.js');
// theses are the commands that do stuff

    //Create a new User
    app.post('/users', user.create);

    app.get('/users', users.findAll);
    app.get('/', users.root);

    //update a user specified by quotationId
    app.put('/users/:Password', users.update);

    //delete a user specified by userName
    app.delete('/user/:Username', users.delete);

}