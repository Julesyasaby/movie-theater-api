const express = require('express')
const { Show } = require('../models');

const router = express.Router();

//get all shows
router.get("/", async (req, res) => {
  const shows = await Show.findAll({});
  res.json(shows);
  })

//get one shows
router.get("/:id", async (req, res) => {
  const number = req.params.id
  const show = await Show.findByPk(number);
  res.json(show);
})

//get shows of a particular genre
router.get("/:id/show", async (req, res) => {
  const response = await Show.findAll({
    where: {
      genre : req.params.genre
    }
  })
res.json(response)
})

//put update rating of a show
router.put("/:id/rating", async (req, res) => {
  const show = await Show.findByPk(req, res);
  if (show) {
    show.rating = req.body.rating;
    await show.save();
    res.json(show);
  } else {
    res.status(404).send('Not found');
  }
}):

//put update the status of a show stored with a key of available
router.put("/:id/status", async (req, res) => {
  const show = await Show.findByPk(res.params.id);
  if (show) {
    show.available = req.body.available;
    await show.save();
    res.json(show);
  } else {
    res.status(404).send('Not found');
  }
});

//delete a show
router.delete("/:id/", async (req, res) => {
  const show = await Show.findByPk(res.params.id);
  if (show) {
    await show.destroy();
    res.json(show);
  } else {
    res.status(404).send('Not found');
  }
});

module.exports = router;