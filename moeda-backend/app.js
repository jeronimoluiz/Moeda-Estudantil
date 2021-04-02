require('dotenv').config();
const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./src/routes')
const app = express();
const port = process.env.PORT; // porta backend

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//definindo as rotas
app.use(router);

app.listen(port, () => {
    console.log("application is running on port " + port)
})