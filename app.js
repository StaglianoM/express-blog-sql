const express = require('express');
const postsRouter = require("./routers/routerPost");
const cors = require('cors');
// const checkTime = require("./middlewares/checkTime");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require('./middlewares/notFound');
const app = express();
const port = 3000;



const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));


app.use(express.static('public'));

// Checktime 
// app.use(checkTime);

// Bodyparser JSON
app.use(express.json());

// Rotte principali
app.use("/posts", postsRouter);

// Middleware per le rotte non trovate (404)
app.use(notFound);

// Middleware per la gestione degli errori (500)
app.use(errorHandler);

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
