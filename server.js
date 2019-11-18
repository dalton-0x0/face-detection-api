const express = require("express");
const app = express();

app.listen(3030, () => {
  console.log("this port is working");
});
/*
app.use(express.urlencoded({extended: false}));
app.use(express.json());
*/
