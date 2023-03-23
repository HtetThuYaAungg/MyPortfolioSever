const mongoose = require("mongoose");

const DB = "mongoUrl";

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database connected")).catch((err) => console.log("error" + err.message));