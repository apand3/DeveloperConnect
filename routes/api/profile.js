const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
//Load profile model

const Profile=require('../../models/Profile');
const User=require('../../models/User');
const validateProfileInput=require('../../Validation/profile');
const validateExpeienceInput=require('../../Validation/experience');
const validateEducationInput=require('../../Validation/education');
const validateReferenceInput=require('../../Validation/reference');
//@access public
router.get('/test',(req,res)=>res.json({msg:"profile works"}));

///////////////
//@rout GET api/profile/handle/:handle
//@desc Get profile by handle
//@access Public
router.get('/handle/:handle',(req,res)=>{
    const errors={};
Profile.findOne({handle:req.params.handle})
.populate('user',['name','avatar'])
.then(profile=>{
    if(!profile){
        errors.noprofile='There is no profile for this user';
        res.status(404).json(errors);
    }
    res.json(profile);
})
.catch(err=>res.status(404).json(err));
})
///////////////
//@rout GET api/profile/all
//@desc Get profile by all
//@access Public
router.get('/all',(req,res)=>{
    const errors={};
Profile.find()
.populate('user',['name','avatar'])
.then(profiles=>{
    if(!profiles){
        errors.noprofile='No record found';
        res.status(404).json(errors);
    }
    res.json(profiles);
})
.catch(err=>res.status(404).json(err));
})



////////////////////

//@rout GET api/profile/user/:user_id
//@desc Get profile by handle
//@access Public
router.get('/user/:user_id',(req,res)=>{
    const errors={};
Profile.findOne({user:req.params.user_id})
.populate('user',['name','avatar'])
.then(profile=>{
    if(!profile){
        errors.noprofile='There is no profile for this user';
        res.status(404).json(errors);
    }
    res.json(profile);
})
.catch(err=>res.status(404).json(err));
})
///////////////////
//get by handle
//@access Public
router.get('/handle/:handle_id',(req,res)=>{
    const errors={};
Profile.findOne({handle:req.params.handle_id})
.populate('user',['name','avatar'])
.then(profile=>{
    if(!profile){
        errors.noprofile='There is no profile for this user';
        res.status(404).json(errors);
    }
    res.json(profile);
})
.catch(err=>res.status(404).json(err));
})

////////////////////////////////
//@rout GET api/profile
//@desc Get current users profile
//@access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={}
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile)
        {
            errors.noprofile='There is no profile for this user';
            return res.status(400).json(errors);
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
})

//@rout POST api/profile
//@desc Create current users profile
//@access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid}=validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const profileFields={};
    profileFields.user=req.user.id;
    if(req.body.handle)profileFields.handle=req.body.handle;
    if(req.body.company)profileFields.company=req.body.company;
    if(req.body.website)profileFields.website=req.body.website;
    if(req.body.location)profileFields.location=req.body.location;
    if(req.body.bio)profileFields.bio=req.body.bio;
    if(req.body.status)profileFields.status=req.body.status;
    if(req.body.githubuser)profileFields.githubuser=req.body.githubuser;
    //skilss-into array
    if(typeof req.body.skills!=='undefined')
    {
        profileFields.skills=req.body.skills.split(',');
    }
    profileFields.social={};
    if(req.body.youtube)profileFields.social.youtube=req.body.youtube;
    if(req.body.facebook)profileFields.social.facebook=req.body.facebook;
    if(req.body.twitter)profileFields.social.twitter=req.body.twitter;
    if(req.body.linkedin)profileFields.social.linkedin=req.body.linkedin;

   Profile.findOne({user:req.user.id})
   .then(profile=>{
       if(profile)
       {
           //update
           Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
           .then(profile=>res.json(profile));
       }
       else
       {
           //create
           //check if handle exist
           Profile.findOne({handle:profileFields.handle})
           .then(profile=>{
               if(profile){
                   errors.handle='That handle is already exist';
                   res.status(400).json(errors);
               }
               new Profile(profileFields).save()
               .then(profile=>res.json(profile));
           })


       }
   })
})
//@rout POST api/profile/experience
//@desc Create current users experience
//@access Private


/////

//@rout POST api/profile/experience
//@desc Create current users experience
//@access Private


///////////////////
//@rout POST api/profile/experience
//@desc Create current users experience
//@access Private

router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid}=validateExpeienceInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
   
    console.log(req.body.current);
    Profile.findOne({user:req.user.id})
    .then(profile=>{
       
const newExp=
{
    title:req.body.title,
    company:req.body.company,
    location:req.body.location,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    description:req.body.description
}
// add to experiene array

profile.experience.unshift(newExp);
profile.save().then(profile=>res.json(profile));
           
})
.catch(err=>res.json(err));
})

/////

//@rout POST api/profile/experience
//@desc Delete current users experience
//@access Private

//@rout POST api/profile/experience
//@desc Create current users experience
//@access Private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        
const removeIndex=profile.experience
                    .map(item=>item.id)
                    .indexOf(req.params.exp_id);

profile.experience.splice(removeIndex,1);

profile.save().then(profile=>res.json(profile));
           
})
.catch(err=>res.json(err));
})
//////////
router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid}=validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
   
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        
const newExp=
{
    school:req.body.school,
    degree:req.body.degree,
    fieldofstudy:req.body.fieldofstudy,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    description:req.body.description
}
// add to experiene array
console.log(profile);
profile.education.unshift(newExp);
profile.save().then(profile=>res.json(profile));
           
})
.catch(err=>res.json(err));
})
//Education delete
router.delete('/education/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        
const removeIndex=profile.education
                    .map(item=>item.id)
                    .indexOf(req.params.exp_id);

profile.education.splice(removeIndex,1);

profile.save().then(profile=>res.json(profile));
           
})
.catch(err=>res.json(err));
})
/////////////////////////

router.post('/reference',(req,res)=>{
    const{errors,isValid}=validateExpeienceInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
   
    console.log(req.body.current);
    Profile.findOne({user:req.user.id})
    .then(profile=>{
       
const newExp=
{
    title:req.body.title,
    company:req.body.company,
    location:req.body.location,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    description:req.body.description
}
// add to experiene array

profile.experience.unshift(newExp);
profile.save().then(profile=>res.json(profile));
           
})
.catch(err=>res.json(err));
})


///////////////////////////////////
module.exports=router;