const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4201"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

const db = require("./app/model");
db.mongoose
    .connect("mongodb+srv://mongo:9Czorj8i9afw3fNZ@cluster0.fbzkqgc.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to modjoul backend application."});
});

require("./app/route/user.route")(app);
require("./app/route/post.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});