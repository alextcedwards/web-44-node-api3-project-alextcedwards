const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model");
// The middleware functions also need to be required

const router = express.Router();

function checkIdExists(req, res, next) {
  const { id } = req.params
  Users.findById(id)
    .then(user => {
      if (user) {
        req.user = user 
        next() 
      } else {
       
        next({ message: `user with id ${id} not found!!!` })
      }
    })
    .catch(next)
}

function checkUserPayload(req, res, next) {
  // if req.body legit call next
  // otherwise call next in a sadder way...
  if (!req.body.name) { // req.body always exists, at least as {}
    next({ message: `please provide a name!!!!`, status: 422 })
  } else if (req.body.name < 3) {
    next({ message: `name must be at least 3 chars`, status: 422 })
  } else {
    // happy happy
    next()
  }
}

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error); // send that object over to the err handling midd!
    });
});

router.get("/:id", checkIdExists, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.hub)
});

router.post("/", checkUserPayload, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.add(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      next(error)
    });
});

router.put("/:id", (req, res, next) => {
  // RETURN THE F res, FRESHHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res, next) => {
  // RETURN THE F res, FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
