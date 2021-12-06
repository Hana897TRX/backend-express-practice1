const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;
const routerApi = require('./routes')

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello world")
})

routerApi(app)

app.listen(port, () => {
  console.log('Server started at port ' + port)
});
