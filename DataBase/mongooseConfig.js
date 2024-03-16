
const mongoose = require('mongoose');
const { keyToken} = require('../config/secret')

mongoose.connect(`mongodb+srv://${keyToken.db_name}:${keyToken.db_pass}@cluster.w5tvj76.mongodb.net/DataBaseStore`)
  .then(() => console.log('Connected DataBaseStore'));