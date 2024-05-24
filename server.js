const express = require("express");
const userRoutes = require('.routes/users.js')
const showRoutes = require('.routes/shows.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes)
app.use('/users', showRoutes)

const port = 3000
app.listen(port, function () {
  console.log('Listening on port' + port)
})

module.exports = {Shows, users};