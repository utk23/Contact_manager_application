const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
connectDb();
const port = process.env.PORT || 5000;
app.use(express.json());


app.use('/api/contacts', require('./routes/contactsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running`);
})
