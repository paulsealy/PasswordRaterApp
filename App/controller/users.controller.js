//tells the model what it's doing with each command

//Create and save new data

const user = require('../models/users.models.js');

exports.create = (req, res) => {
    // Validate the request
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty!"
        });
    }

    // Create a new User (using schema)
    const user = new User({
        Username: req.body.Username,
        Password: req.body.Password,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the User."
        });
    });
};

//Retrieve and return all data from database
exports.findAll = (req, res) => {
    User.find()
    .then(User => {
        res.send(User);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all the Users."
        });
    });
};

//update Users in db
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User field cannot be empty"
        });
    }

    // Find the Quotation and update it with the request body
    User.findByIdAndUpdate(req.params.Username, {
        Username: req.body.Username,
        Password: req.body.Password,
       

    }, { $set: req.body },   // $set - modify only the supplied fields
       { new: true })        // "new: true" return updated object
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "User not found with User " + req.params.Username
            });
        }
        res.send(User);
    }).catch(err => {
        if(err.kind === 'Username') {
            return res.status(404).send({
                message: "User not found with User " + req.params.Username
            });                
        }
        return res.status(500).send({
            message: "Error updating User with User " + req.params.Username
        });
    });
};

//deleting a user
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.Username)
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "User not found with User " + req.params.Username
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'User' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with name " + req.params.Username
            });                
        }
        return res.status(500).send({
            message: `Could not delete user with First name ${req.params.Username}`
        });
    });
};

exports.root = (req, res) => {
    User.find()
    .then(User =>{
        res.render('user.view',{
            results: User
        });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "An error occurred"
        });
    });
};

//search for user matching string
exports.searchFirstname = (req, res) => {
    var search = req.params.s;
    console.log("Searching..." + search)
    User.find({Username: new RegExp(search,"ig")})
    .then(User=>{
        res.render('user.view',{
            results: User
        });
    });
};
exports.searchSecondname = (req, res) => {
    var search = req.params.s;
    console.log("Searching..." + search)
    User.find({Sname: new RegExp(search,"ig")})
    .then(User=>{
        res.render('user.view',{
            results: User
        });
    });
};