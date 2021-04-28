const app = require("./app");

app.listen(process.env.PORT || 8000, () => {
  console.log("server started at 8000 port");
});
