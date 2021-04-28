const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((data) =>
    console.log(`Connected to "${data.connections[0].name}" database!`)
  )
  .catch(err => {
    console.log(err)
  });

mongoose.connection.on("error", (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log("1000")
});
