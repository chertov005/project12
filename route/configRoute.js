const usersR = require('./usersRoute');
const foodsR = require('./foodsRoute');


///פונקציה שמפעילה את כל הרוטים 
exports.routInit = (app) => {

    app.use('/users' , usersR);
    app.use('/foods' ,  foodsR);

};