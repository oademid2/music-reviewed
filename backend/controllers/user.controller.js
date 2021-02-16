const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');



//create a user
exports.user_create = function (req, res,next) {
    let x = false;
    //find if user email exists
    User.findOne({email: req.body.email}).exec()
    .then(function(user, err) {

        //if it exists then repond that it is not unique
        if (user){
            return res.status(200).json({
                notunique: true

            });
          
        }else{
            
            //create an encrypted password
            bcrypt.hash(req.body.password,10, (err, hash) => {
                if (err){
                    return next(err);
                  
                }else{
                    const user = new User(
                        {
                            email: req.body.email,
                            password: hash,
                            active: true,
                            manager: false,
                            verified: false,
                            verToken: crypto.randomBytes(16).toString('hex')//create verification token
       


                         });


                        //upon encryption post save the user
                         user.save(function (err, result) {
                            if (err) {
                                return next(err);
                            }

        //https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
        //send confirmation email
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {user: process.env.gmail_account, pass: process.env.gmail_password}
          });
          var mailOptions = {
            from: 'no-reply@lab5.com', to: user.email, subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +
            '\/api\/verify\/' + user.verToken + '.\n'
          };
  
          transporter.sendMail(mailOptions, function (err) {
  
            console.log('sending the email', transporter);
            if (err) {
              console.log('errokc 2', err);
            }
            console.log('success', transporter);
          
  
          });
                            return res.status(200).json(result);
                    
                        })
                }
     });

        }
    })

    //if(x) return res.status(200).json({msg: 'nah'})


   
  
};

//used to allow user to verify
exports.verify = function(req,res,next){



    User.findOne({verToken: req.params.token}).exec()
    .then(user=>{

        User.findById(user).exec()
        .then(userb=>{

            //when called userb is updated
            console.log(userb)
            userb.verified = true;
            User.findByIdAndUpdate(user, {$set: userb}, function (err, user2) {
                if (err) return next(err);
                res.send(user2);
            });
        })

    })


}



exports.reverify = function(req,res,next){


    //if the user want to reverify....
    User.findById(req.params.id, function (err, user) {

        console.log(user)

        //resend the email with token originaly created...
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {user: '[xxxx]@gmail.com', pass: '[xxxx]'}
          });
          var mailOptions = {
            from: 'no-reply@lab5nasacom', to: user.email, subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +
            '\/api\/verify\/' + user.verToken + '.\n'
          };
    
          transporter.sendMail(mailOptions, function (err) {
    
            console.log('sending the email', transporter);
            if (err) {
              console.log('errokc 2', err);
              r//eturn res.json({link: "none"})
            }
            console.log('success', transporter);
    
          });

    })

                  
}

//user log in
exports.user_login = function(req,res,next){

    User.find({email: req.body.email}).exec()
    .then(user=>{
        if (user.length<1){
            return res.json({
                message: 'Auth failed'

            }).status(404);
        }

        //check if encryption matches what user inputed
        //check if verified/authenticated
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }if(user[0].active == false){
                return  res.status(200).json({
                    user: user[0],
                    active: user[0].active
                })
            }
            if(result){
                
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, 

                {
                    expiresIn: "1h"

                }
                );

     
                if(!user[0].verified){
                    console.log("not verified")
                    return res.status(200).json({
                        message: 'unverified',
                        successAuth: false,
                        user: user[0]
                    })
                }
          
                    return res.status(200).json({
                        message: 'Auth successful',
                        successAuth: true,
                        token: token,
                        active: user[0].active,
                        user: user[0]

                    })
                
            }

            res.status(200).json({
                message:'Auth failed',
                failedAuth:true
            })
        });
    })
    .catch(err => {

        console.log(err);
        res.status(500).json({
            error:err
        });
    })
    
}

exports.users = function (req, res) {
    User.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
};

exports.get_user = function (req, res) {
    User.findById(req.params.id, function (err, user) {
         if (err) return next(err);
         res.send(user);
     })
 };

 exports.update_user = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};

exports.google_login = function(req,res,next){
    let Itoken = req.body.idToken
    User.find({email: req.body.email}).exec()
    .then(user=>{
        if (user.length<1){
            const user = new User(
                {
                    email: req.body.email,
                    password: 'none',
                    active: true,
                    manager: false,
                    verified: true,
                    verToken: ''
                 });


                 user.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    /*return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        active: result.active,
                        user: result
                    })*/
                    //res.json(result)
                    const token = jwt.sign({
                        email: result.email,
                        userId: result._id
                    }, 
                    process.env.JWT_KEY, 
        
                    {
                        expiresIn: "1h"
        
                    }
                    );

                    res.json({
                        message: 'Auth successful',
                        token: token,
                        active: result.active,
                        user: result
                    })
            
                })
  
        }else{
            /*res.json({
                message: 'Auth successful',
                token: Itoken,
                user: user,
                active: user.active
            })*/
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            }, 
            process.env.JWT_KEY, 

            {
                expiresIn: "1h"

            }
            );

            //console.log("secret ", type(process.env.JWT_KEY))//
      
                res.json({
                    message: 'AuthO successful',
                    token: token,
                    active: user.active,
                    user: user

                })
        }


    })
    .catch(err => {

        console.log(err);
        res.status(500).json({
            error:'err'
        });
    })
    
}
 

/*
return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        active: user[0].active,
                        user: user[0]

                    })
*/
 
 
