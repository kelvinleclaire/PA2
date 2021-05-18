import express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// import custom routes
const inspectionPlanRoute = require('./controllers/inspectionPlanRoute');
const user = require('./controllers/userRoute');

// create server and save server var to access it for further/future improvements
const app: express.Application = express();
const server = require("http").createServer(app);

// if hosted by heroku use their port, else 3001 as a backend-server
const PORT: string = process.env.PORT || `3001`;

//middleware to extract json from post and get requests
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// routehandling for default connection
app.get('/', (req, res) =>
{
  res.send(`Hello! Server is listening at Port ${PORT}!`);
});

//User routes for plans and user api
app.use('/plans/', inspectionPlanRoute);
app.use('/user/', user);


// start server
server.listen(PORT,() =>
{
  console.log(`App is listening at ${PORT}`);
});



