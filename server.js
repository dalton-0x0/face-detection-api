const express = require("express");
const app = express();
app.use(express.json());
const database = {
  users: [
    {
      id: "123",
      name: "John Doe",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally Slim",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(`GET req root`);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success signing in");
  } else {
    res.status(404).json("error signing in");
  }
  res.json(`POST req signin`);
});

app.post("/register", (req, res) => {
  database.users.push({
    id: "124",
    name: "Sally Slim",
    email: "sally@gmail.com",
    password: "bananas",
    entries: 0,
    joined: new Date()
  });
});

app.listen(3030, () => {
  console.log("app is running from port 3030");
});
/*
app.use(express.urlencoded({extended: false}));
app.use(express.json());
*/

/*
server endpoints
/ ---> GET = this is working!!
/signin ---> POST = success/fail
/register ---> POST = new user
/profile/:userId ---> GET = a particular user
/image ---> PUT = user image for ranking
*/
