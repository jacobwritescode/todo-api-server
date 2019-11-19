const mongoose = require("mongoose")
 exports.ConnectDB = () => {
    return new Promise((resolve, reject) => {
        //Set up default mongoose connection
        mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true,useUnifiedTopology:true});
        const db = mongoose.connection;
        db.on("connected to DB", function () {
            resolve(db);
        });
        db.on("error", reject);
    });
};
