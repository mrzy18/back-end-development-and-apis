const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/form", express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});