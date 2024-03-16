const mongoose = require('mongoose') ;
const joi = require('joi');


const schema = new mongoose.Schema({

    name:String ,
    cals:Number,
    price:Number,
    image_url:String,
    category_id:String,
    user_id:String,
    date_crated: {type:Date , default:Date.now()}




});


exports.FoodsModel = mongoose.model("foods" , schema);


exports.validFoods = (req_body) => {

    let schema = joi.object({

        name:joi.string() .min(2) .max(9999) .required() ,
        cals:joi.string() .min(1) .max(9999999) .required() ,
        price:joi.string() .min(1) .max(999999) .required() ,
        image_url:joi.string() .min(2) .max(9999) .allow(null ," ") ,
        category_id:joi.string() .min(2) .max(9999) .required() 

    });

    return schema.validate(req_body);

};