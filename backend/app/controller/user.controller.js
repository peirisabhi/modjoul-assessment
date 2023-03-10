const db = require("../model")
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {

    console.log(req.body)

    // Validate request
    if (!req.body.email) {
        res.status(400).send({message: "Email can not be empty!"});
        return;
    }

    // Create a User
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        status: true

    });

    // Save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? {email: {$regex: new RegExp(email), $options: "i"}} : {};

    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found User with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving User with id=" + id});
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {

    console.log(req.body)

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({message: "User was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};



exports.login = (req, res) =>{
    console.log("login called")
    console.log(req.body)
    User.findOne({email: req.body.email})
        .then(data => {
            if(data.password == req.body.password){
                res.send(data);
                console.log("Login Successes")
            }else{
                res.status(404).send({
                    message: "Invalid Conditionals"
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}


