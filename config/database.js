const mongoose = require("mongoose");

const {MONGO_URI} = process.env;

exports.connect = () => {
    // Connecting to the db
    mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Connection to database failed, Exiting now...");
        console.error(error);
        process.exit(1);
    });
};