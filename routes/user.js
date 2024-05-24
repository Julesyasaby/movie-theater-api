const express = require('express')
const { User } = require('../models');

const router = express.Router();

//get all users
router.get("/", async (req, res) => {
  const users = await User.findAll({});
  res.json(users);
  })

//get one user. This checks if a user was found. If user is null, it sends a 404 response with an appropriate error message.
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (user) {
  res.json(user);
} else {
  res.status(404).json({ error: 'User not found.'})
}});

//get all shows watched by a user
router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user.watchedShows);
  } else {
    res.status(404).json({ error: 'User not found.' });
  }})

  //get all shows watched by a user(user id in req.params)
router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const shows = await user.getShows()
  if (user) {
    res.json(user.getShows);
  } else {
    res.status(404).json({ error: 'User not found.' });
  }});

  //put update and add a show if a user has watched it
router.put("/:id/shows", async function (req, res) {
  let user = await User.findByPk(req.params.userId);
  let shows = await user.getShows()
if (user){
  user = await shows.update({
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    available: req.body.available
  })
  res.send(shows)
}});
module.exports = router;