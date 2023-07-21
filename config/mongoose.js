// // Require the library
// const mongoose = require('mongoose');
// const env = require('./environment');

// // connect to database
// // mongoose.connect(`mongodb://localhost/${env.db}`);

// mongoose.connect("mongodb+srv://salmaan194:Bk5paMbsSI8Falck@cluster0.ocpab4h.mongodb.net/?retryWrites=true&w=majority")


// // acquire the connection (to check connection is successfull)
// const db = mongoose.connection;


// // message on connection error
// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// // message on connection success
// db.once('open', function(){
//    console.log("Connected to MongoDB");
// });

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const db = mongoose
  .connect(
    "mongodb+srv://salmaan194:Bk5paMbsSI8Falck@cluster0.ocpab4h.mongodb.net/?retryWrites=true&w=majority",
    {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection is successfully");
  })
  .catch((e) => {
    console.log("No Connection");
  });


module.exports = db;