const Validator=require('validator');
const isEmpty=require('./is.empty');


module.exports=function validateExperienceInput(data){
    let errors={};
    data.title=!isEmpty(data.title)?data.title:'';
    data.company=!isEmpty(data.company)?data.company:'';
    data.from=!isEmpty(data.from)?data.from:'';
    
    if(Validator.isEmpty(data.title))
    {
        errors.title='Job title is required';
    }
    if(Validator.isEmpty(data.company)){
        errors.company='comapany is required';
    }
    if(Validator.isEmpty(data.from)){
        errors.from='From date is required';
    }
    
    if(Validator.isBefore(data.to,data.from)){
        errors.to="To date must be greater than from date";
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
};