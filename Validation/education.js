const Validator=require('validator');
const isEmpty=require('./is.empty');


module.exports=function validateEducationInput(data){
    let errors={};
    data.school=!isEmpty(data.school)?data.school:'';
    data.degree=!isEmpty(data.degree)?data.degree:'';
    data.fieldofstudy=!isEmpty(data.fieldofstudy)?data.fieldofstudy:'';
    data.from=!isEmpty(data.from)?data.from:'';
    
    if(Validator.isEmpty(data.school))
    {
        errors.school='School name is required';
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree='Degree is required';
    }
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy='Fieldofstudy is required';
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