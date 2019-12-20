const express = require("express");
const app = express();
var cors = require('cors');
const bodyParser = require("body-parser");
const PORT = process.env.PORT | 3000;

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

//import routers
const authRouter = require('./routes/authRoutes');
const eventsRouter = require('./routes/eventsRoutes');
 

app.use('/api/auth',authRouter);
app.use('/api/events',eventsRouter);

app.listen(PORT,()=>{
  console.log('Server is up & running on port:'+PORT);
});
