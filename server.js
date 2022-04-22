const express = require('express');
const routes = require('./routes');
const { sequelize } = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  app.use(require('./routes'));

  sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); 
  })});