const express = require("express");
const bodyParser = require("body-parser");
// const {connectDB} = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const { authenticate } = require('./middlewares/authMiddleware');
const fs = require("fs");

const app = express();
const port = 80;

//middleware
app.use(bodyParser.json());
//connect to db
// connectDB();

//routes 

// app.use('/api/auth', authRoutes); //authentication routes
// app.use('/api/tasks', authenticate, taskRoutes); //task routes


app.listen(port, () =>
  console.log(`Task management app listening at http://localhost:${port}`),
);
