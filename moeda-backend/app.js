const express  = require('express');

const app = express()
const port = 8081;

app.listen(port, () => {
    console.log("application is running on port " + port)
})