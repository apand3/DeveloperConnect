
const Validator=require('validator');
const isEmpty=require('./is.empty');


module.exports=function validateProfileInput(data){
    let errors={};
    
    data.handle=!isEmpty(data.handle)?data.handle:'';
   // data.status=!isEmpty(data.status)?data.status:'';
    data.skills=!isEmpty(data.skills)?data.skills:'';
    
    if(!Validator.isLength(data.handle,{min:2,max:10})){
        errors.handle='handle needs to be between 2 and 4 characters';
    }
    
    
    if(Validator.isEmpty(data.handle))
    {
        errors.handle='Profile handle is required';
    }
    if(Validator.isEmpty(data.company))
    {
        errors.company='Company is required';
    }
    // if(Validator.isEmpty(data.status)){
    //     errors.status='Profile status is required';
    // }
    if(Validator.isEmpty(data.skills)){
        errors.skills='Skills are required';
    }
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website='Not a valid URL'
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.website='Not a valid URL'
        }
    }
    
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
};