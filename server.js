const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');
const path=require('path');
//DB COnfig
const db=require('./config/keys').mongoURI;

//Connect through mongodb
mongoose.connect(db).then(()=>console.log('Mongodb connected')).catch(()=>console.log('error'))
app.use(passport.initialize());

require('./config/passport')(passport);
//app.get('/',(req,res)=>res.send('Hello!'));
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

//production
if(process.env.NODE_ENV==='production'){
    app.use(express.static(`client/build`));
    app.get("*",(req,res)=>{
        res.sendfile(path.resolve(__dirname,'client','build','index.html'));
    })
}
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}`));