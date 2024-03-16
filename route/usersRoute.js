const express = require('express');
const router = express.Router();
const {UsersModel,validUsers , validLogin} = require('../model/usersModel');
const bcrypt = require('bcrypt');
const {authToken,genToken} = require('../AuthToken/AuthToken')



/////////////////////////////////////////////////////////////////////////////////////////////
router.get('/' ,authToken, async(req , res) => {

    try {
        
        let data ;

        if(req.tokenData.role == 'admin') {
            data = await UsersModel.find({}) 
            return res.status(200) .json(data) 
        }
        

        else{
            return res.status(401) .json({message:'you dont have permission '})
        }


    } catch (error) {
        return res.status(500) .json({message:'internal server error 500'})
    }


});
/////////////////////////////////////////////////////////////////////////////////

router.get('/info' , async(req , res) => {

    try {
        
        let userInfo = await UsersModel.findOne({_id:req.decodeToken} , {password:0})
        return res.status(200) .json(userInfo)

    } catch (error) {
        return res.status(500) .send(error)
    }


});



//////////////////////////////////////////////////////////////////////////////////
router.post('/' , async(req , res) => {

    let valid = validUsers(req.body) ;
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    };


    try {
        
        let data = new UsersModel(req.body) 
        data.password = await bcrypt.hash(data.password ,  10)
        await data.save() 
        return res.status(201) .json(data)


    } catch (error) {
        return res.status(500) .send(error)
    }


});
///////////////////////////////////////////////////////////////////////////////////

router.delete('/:idDel' , async(req , res) => {

    try {
        
        let data = await UsersModel.deleteOne({_id:req.params.idDel})
        return res.json(data)


    } catch (error) {
        return res.status(500) .json(error)
    }

});

/////////////////////////////////////////////////////////////////////////////////////////////


router.put('/:idEdit' ,async(req , res) => {


    let valid = validUsers(req.body) ;
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    };


    try {
        
        let data = await UsersModel.updateOne({_id:req.params.idEdit} ,req.body);
        return res.json(data)

    } catch (error) {
        return res.status(500) .send(error)
    }

});

///////////////////////////////////////////////////////////////////////////////////////////


router.post('/login' , async(req , res) => {

    let valid = validLogin(req.body) ;
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    }


    try {
        
        let user = await UsersModel.findOne({email:req.body.email}) 
        if(!user) {
            return res.status(401) .json({message: 'wrong user , try agin'})
        }

        let passValid = await bcrypt.compare(req.body.password , user.password) 
        if(!passValid) {
            return res.status(401) .json({message:'wrong password , try agin'})
        }

        let token = genToken(user._id ,user.role) ;

        return res.json({message:'success login' ,token:token})


    } catch (error) {
        return res.status(500) .json(error)
    }


});


module.exports = router ;