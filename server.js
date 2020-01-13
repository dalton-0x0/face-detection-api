const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "eden45",
    database: "smart-brain"
  }
});

db.select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const app = express();
app.use(express.json());
app.use(cors());

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
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  /*
  bcrypt.compare(
    "apples",
    "$2a$10$4qchaqouvVaDOKtCbU6dAurRLbhEcvWBzvX7cQv7QeqR6JCrQJ0bK",
    (err, res) => {
      console.log("first guess", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$4qchaqouvVaDOKtCbU6dAurRLbhEcvWBzvX7cQv7QeqR6JCrQJ0bK",
    (err, res) => {
      console.log("second guess", res);
    }
  );
  */
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
    // res.json("success signing in");
  } else {
    res.status(404).json("error signing in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json("user already exists"));
  /*
  bcrypt.hash(password, null, null, function(err, hash) {
    // store hash in password database
    console.log(hash);
  });
*/

  // below code replaced by knex

  /*
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
  */
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.listen(3030, () => {
  console.log("app is running from port 3030");
});

/*
app.use(express.urlencoded({extended: false}));
app.use(express.json());
*/
