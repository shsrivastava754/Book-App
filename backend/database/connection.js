const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const uri = "mongodb://127.0.0.1:27017/booksDb";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
