const db = require("../model")
const Post = db.post;

const fileUpload = require("express-fileupload");
const path = require("path");
const fileConfig = require("../config/file.config");


// Create and Save a new post
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({message: "title can not be empty!"});
        return;
    }

    if (!req.files) {
        return res.status(400).send("No images were uploaded.");
    }

    //upload file
    const file = req.files.image;
    const fileName = Date.now() + "_" + file.name.trim()
    const savePath = fileConfig.path + fileName;

    console.log(savePath)

    file.mv(savePath, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        // return res.send({status: "success", path: savePath});
    });

    // Create a post
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: fileName,
        userId: null
    });


    // Save User in the database
    post
        .save(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the post."
            });
        });
};


// update post
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    var post;

    console.log(id)

    if (req.files) {

        //upload file
        const file = req.files.image;
        const fileName = Date.now() + "_" + file.name.trim()
        const savePath = fileConfig.path + fileName;


        file.mv(savePath, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
        });

        post = new Post({
            title: req.body.title,
            description: req.body.description,
            image: fileName,
            userId: null,
            _id: id
        });

    } else {
        post = new Post({
            title: req.body.title,
            description: req.body.description,
            userId: null,
            _id: id
        });
    }


    Post.findByIdAndUpdate(id, post, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update post with id=${id}. Maybe post was not found!`
                });
            } else res.send({message: "post was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating post with id=" + id
            });
        });

};


// Delete a post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete post with id=${id}. Maybe post was not found!`
                });
            } else {
                res.send({
                    message: "post was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete post with id=" + id
            });
        });
};


// Retrieve all post from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Post.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        });
};


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Post.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Post with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Post with id=" + id});
        });
};



exports.getFile = (req, res) =>{
    if(!req.params['name']) res.send('cannot find the file with name :'+req.params['name'])
    // Set disposition and send it.
    res.sendFile(fileConfig.path+req.params['name'],function (err) {
        if(err){
            throw err;
        }else{
            console.log('File: '+req.params['name']+' sent');
        }
    })
}