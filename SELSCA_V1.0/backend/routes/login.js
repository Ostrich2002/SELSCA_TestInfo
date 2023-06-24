

var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyJWT = require("../middleware/verifyJWT");

//importing mongoDB models
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

//main login function which check if a user exists by email and checks the hashed password 
router.post('/' , async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

//these 3 lines get printed in terminal where we have started the backend server
console.log('email:', email);   //extra line just to check what are values
console.log('password:', password);   //extra line just to check what are values
console.log('role:', role);   //extra line just to check what are values


    if (email && password) {

        if (role == 'student') {
            const student = await Student.findOne({email : email})
            
            if (!student) {
                return res.status(401).json({
                    message : 'No account found with the given email ID'
                })
            }

            const isMatch = await bcrypt.compare(req.body.password , student.password)  
            console.log(isMatch);
            if (!isMatch) {
                return res.status(401).json({
                    message : "Invalid password"
                })
            }
            const payload = { 
                id : student._id,
                email : student.email
            }

            //signing the payload with a Json Web Token before sending it to the frontend
            const token = jwt.sign(payload , 
                process.env.JWT_secret,
                {expiresIn : 86400},
                (err, token) => {
                    if (err) {
                        return res.json({
                            message : err
                        })
                    }
                    return res.status(200).json({
                        message : 'success',
                        token: "Bearer " + token
                    })
                })
        }

        if (role == 'teacher') {
            const teacher = await Teacher.findOne({email : email})
            console.log('test')
            
            if (!teacher) {
                return res.status(401).json({
                    message : 'No account found with the given email ID'
                })
            }

            const isMatch = await bcrypt.compare(req.body.password , teacher.password)
            if (!isMatch) {
                return res.status(401).json({
                    message : "Invalid password"
                })
            }

            const payload = { 
                id : teacher._id,
                email : teacher.email
            }

            const token = jwt.sign(payload , 
                process.env.JWT_secret,
                {expiresIn : 86400},
                (err, token) => {
                    if (err) {
                        return res.json({
                            message : err
                        })
                    }
                    return res.status(200).json({
                        message : 'success',
                        token: "Bearer " + token
                    })
                })
        }


        if (role == 'admin') {
            const admin = await Admin.findOne({email : email})
            
            if (!admin) {
                return res.status(401).json({
                    message : 'No account found with the given email ID'
                })
            }

            const isMatch = await bcrypt.compare(req.body.password , admin.password)
            if (!isMatch) {
                return res.status(401).json({
                    message : "Invalid password"
                })
            }

            const payload = { 
                id : admin._id,
                email : admin.email
            }

            const token = jwt.sign(payload , 
                process.env.JWT_secret,
                {expiresIn : 86400},
                (err, token) => {
                    if (err) {
                        return res.json({
                            message : err
                        })
                    }
                    return res.status(200).json({
                        message : 'success',
                        token: "Bearer " + token
                    })
                })
        }
    }
})


//function for checking for tampering with the Json Web Token and checks for login status
//also sends the user's information
//uses the verifyJWT middleware function (found in the ../middleware/verifyJWT.js file )
router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json(
        {
            isLoggedIn: true,
            user: req.user
        });
})


module.exports = router;