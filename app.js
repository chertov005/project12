const http = require('http');
const path = require('path') ;
const express = require('express');
const app = express();
const cors = require('cors')
require('./DataBase/mongooseConfig')
const {routInit} = require('./route/configRoute')

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname ,'public' )));
routInit(app)


let port = process.env.PORT || 3012 ;




server.listen(port , (err) => {

    if(err) {
        return console.log(err)
    }

    return console.log(`server up , running on port ${port}`)
});