module.exports = (app) => {
    const user = require('../controller/users.controller.js');

    //Create a new User
    app.post('/user', user.create);

    app.get('/user', user.findAll);
    app.get('/', user.root);

    //update a user specified by quotationId
    app.put('/user/:Password', user.update);

    //delete a user specified by userName
    app.delete('/user/:Username', user.delete);

}