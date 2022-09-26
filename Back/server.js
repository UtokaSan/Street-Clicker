const http = require("http");
const app = require("./app");
const PORT = 1337;

app.get("/hello", (req, res) => {
  console.log("pute");
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`\nserver listen on port : ${PORT}`);
});
