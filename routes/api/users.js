const express=require('express');
const router=express.Router();
const gravatar =require('gravatar');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const key=require('../../config/keys');
const User=require('../../models/User');
const passport=require('passport');
//Load input validation
const validateRegisterInput=require('../../Validation/register');
const validateLoginInput=require('../../Validation/login');
//@access public
router.get('/test',(req,res)=>res.json({msg:"users works"}));

router.post('/register',(req,res)=>{
    const{ errors,isValid}=validateRegisterInput(req.body);

    if(!isValid)
    {
return res.status(400).json(errors);
    }
User.findOne({email:req.body.email}).then(user=>{
    if(user)
    {
        return res.status(400).json({email:'Email already exists'});
    }
    else
    {
        const avatar=gravatar.url(req.body.email,{
            s:'200' ,//size
            r:'pg',
            d:'mm'
        })
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            avatar,
            password:req.body.password
        });
        bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(newUser.password,salt,(err,hash)=>{
    if(err) console.log('error')
    else
    newUser.password=hash;
    newUser.save()
                .then(user=>res.json(user))
                .catch(err=>console.log('error'))
})
        })
    }
})

})

//@access public
router.post('/login',(req,res)=>{
    const email=req.body.email;
    const pwd=req.body.password;
    const{ errors,isValid}=validateLoginInput(req.body);

    if(!isValid)
    {
return res.status(400).json(errors);
    }
    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(404).json({email:'User not found'})
        }
        // check pwd
        bcrypt.compare(pwd,user.password)
        .then(isMatch=>{
            if(isMatch){
                //create token
                const payload=
                {
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar

                }
                
                jwt.sign(payload,key.secret,{expiresIn:36000},(err,token)=>
            {
res.json({
    success:true,
    token:'Bearer ' +token
})
            });
                
            }
            else
            {
                return res.status(400)
                .json({password:'Password incorrect'})
            }
        })
    })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
res.json(req.user);
});
module.exports=router;