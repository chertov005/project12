const express = require('express') ;
const router = express.Router() ;
const {FoodsModel,validFoods} = require('../model/foodsModel');
const {authToken} = require('../AuthToken/AuthToken')


router.get('/' ,authToken, async(req , res) => {

    try {
        
        let data ;

        if(req.tokenData.role == 'admin') {
            data =  await FoodsModel.find({}) 
            return res.status(200) .json(data)
        }

        else{

            data = await FoodsModel.find({user_id:req.tokenData._id})
            return res.status(200) .json(data)

        }




    } catch (error) {
        return res.status(500) .json({message:'internal server error 500'})
    }
    
});


router.post('/' ,authToken, async(req , res) => {
    
    try {
        
        let data = new FoodsModel(req.body) 
        data.user_id = req.tokenData._id
        await data.save() 
        return res.status(201) .json(data)


    } catch (error) {
        return res.status(500) .json({message:'internal server error 500'})
        
    }

});




router.delete('/:idDel' ,authToken,async(req , res) => {

    try {
        
        let data ;

        if(req.tokenData.role == 'admin' ) {
            data = await FoodsModel.deleteOne({_id:req.params.idDel}) 
            return res.json(data)
        }
        
        else{
            data = await FoodsModel.deleteOne({_id:req.params.idDel ,user_id:req.tokenData})
            return res.json(data)
        }
       


    } catch (error) {
        return res.status(500) .json(error)
    }

});



router.put('/:idEdit' , async(req , res) => {

    
    let valid = validFoods(req.body) ;
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    };


    try {
        
        let data = await FoodsModel.updateOne({_id:req.params.idEdit} ,req.body)
        return res.json({message:`${data} edited`})


    } catch (error) {
        return res.status(500) .json(error)
    }

});




module.exports = router ;