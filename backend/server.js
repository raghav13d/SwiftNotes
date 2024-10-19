const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');
const connectDB = require('./config/db.js')
const userRoutes = require('./routes/userRoutes.js');
const notesRoutes = require('./routes/notesRoutes.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');
const path = require('path');

connectDB();
app.use(express.json())
// Enable CORS
app.use(cors());
// Configure allowed origins, methods, and headers
app.options('*', cors());

//Dotenv
dotenv.config();



// Middleware=>Function that has access to req and res
//They are called in between the request and response
//They are executed in the order they are written

//Handling routes
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);


//Handling errors
app.use(notFound)
app.use(errorHandler)


//Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server started at port 3000");
})
