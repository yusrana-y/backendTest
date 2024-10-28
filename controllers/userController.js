const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

//register logix

exports.registerController = async(req,res)=>{
    console.log("inside Register Controller");
    const {username,email,password,fName,lName,mobile}=req.body
    console.log(email,username);
    //check email is present in mongodb    
    try
    {
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser)
        {
            //already user exists
            res.status(406).json("Account already exist, please login")
        }
        else
        {
            const newUser = new users({
                username,email,password,fName,lName,mobile
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    // res.status(200).json('register req received')
}

//login logic


exports.loginController = async(req,res) => {
    console.log("inside login controller")
    //get user details from req body (frontend)
    const {email,password} = req.body
    console.log(email,password);
    //check email password in user model
    try
    {  
        const existingUser = await users.findOne({email,password})
        if(existingUser)
        {
            //generate token using JWT
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

            // allow login
            res.status(200).json({
                user:existingUser,
                token
            })
        }
        else
        {
            //incorrect email and password
            res.status(404).json("Invalid email/password")
        }

    }
    catch(err)
    {
        res.status(401).json(err)
    }
}