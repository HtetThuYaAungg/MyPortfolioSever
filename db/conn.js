const mongoose = require("mongoose");

const DB = "mongodb+srv://HtetThuYa:hplus@atlascluster.5draz9y.mongodb.net/AddProject?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database connected")).catch((err) => console.log("error" + err.message));