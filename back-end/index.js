const express = require("express");
const bodyParser = require("body-parser");
const {connectDB} = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes.js");
// const { authenticate } = require('./middlewares/authMiddleware');
const fs = require("fs");
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cors());
//middleware
app.use(bodyParser.json());
//connect to db
connectDB();

//routes 

app.use('/api/auth', authRoutes); //authentication routes
app.use('/api', appRoutes); //task routes


app.listen(port, () =>
  console.log(`Task management app listening at http://localhost:${port}`),
);
