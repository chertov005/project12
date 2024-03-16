

require('dotenv').config()

exports.keyToken = {
    key:process.env.PUBLIC_KEY ,
    db_name:process.env.DB_NAME ,
    db_pass: process.env.DB_PASSWORD
}


