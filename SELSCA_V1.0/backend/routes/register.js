var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var mongoose = require('mongoose')

//importing mongoDB models 
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Headmaster = require("../models/Headmaster");
const Grades = require("../models/Grades");
const Class = require("../models/Class");
const TestInfo = require('../models/TestInfo');

//admin registration function which hashes the given passwords and creates a new admin object in the mongoDB database
router.post("/registerAdmin" , async(req,res) => {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password , salt);

     const admin = new Admin({
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword,
          studentID : req.body.studentID,
          address : req.body.address,
          gender : req.body.gender,
     })

     Admin.create(admin)
     .then(adm => {
          res.status(200).send(adm)
     })
     .catch(err => {
          res.status(400).send(err)
     })
})

//teacher registration function which hashes the given passwords and creates a new teacher object in the mongoDB database
router.post("/registerTeacher" , async(req,res) => {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password , salt);

     const teacher = new Teacher({
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword,
          studentID : req.body.studentID,
          DOB : req.body.DOB,
          address : req.body.address,
     })

     Teacher.create(teacher)
     .then(tea => {
          res.status(200).send(tea)
     })
     .catch(err => {
          res.status(400).send(err)
     })
})


router.post('/registerHeadmaster' , async (req,res) => {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password , salt);

     const headmaster = new Headmaster({
          name: req.body.name,
          email : req.body.email,
          password : hashedPassword,
          studentID : req.body.studentID,
          DOB : req.body.DOB,
          address : req.body.address,
          gender : req.body.gender,
     })
     
     Headmaster.create(headmaster)
     .then(hea => {
          res.status(200).send(hea)
     })
     .catch(err => {
          res.status(400).send(err)
     })
})



// router.post("/registerStudent", async (req, res) => {
//      const students = req.body.students;
//      const subjects = ["English", "Maths", "Science", "Hindi", "Social"];
//      const results = [];

//      console.log("Incoming students data:", req.body.students);
   
//      for (const studentData of students) {
//           const salt = await bcrypt.genSalt(10);
//           const hashedPassword = await bcrypt.hash(studentData.password, salt);
   
//           console.log("Class Name", studentData.class)
   
//           const classObj = await Class.findOne({ name: studentData.class });
   
//           if (!classObj) {
//              res.status(404).json({ message: "Class not found" });
//              return;
//            }
      
//           const student = new Student({
//             name: studentData.name,
//             email: studentData.email,
//             studentID: studentData.studentID,
//             password: hashedPassword,
//             class: classObj._id,
//             DOB: studentData.DOB,
//           });
   
//        try {
//          // Save the new student
//          const savedStudent = await student.save();
//          results.push(savedStudent);
   
//          // Create a new Grades document for each subject
//          for (let subject of subjects) {
//            const newGrades = new Grades({
//              studentName: studentData.name,
//              studentID: studentData.studentID,
//              subject: subject,
//              tests: [], // Empty tests array
//              finalGrade: null,
//            });
   
//            await newGrades.save();
//          }
//        } catch (err) {
//          console.log(err);
//          res.status(400).send(err);
//          return;
//        }
//      }
   
//      res.status(200).send(results);
//    });

router.post("/registerStudent", async (req, res) => {
     const students = req.body.students;
     const subjects = ["English", "Maths", "Science", "Hindi", "Social"];
     const results = [];
   
     console.log("Incoming students data:", req.body.students);
   
     for (const studentData of students) {
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(studentData.password, salt);
       const className = studentData['className']

       console.log("Class Name", studentData['className'])
   
       try {
         const classObj = await Class.findOne({ name: className });
   
         if (!classObj) {
           res.status(404).json({ message: "Class not found" });
           return;
         }
   
         console.log(studentData)
         const student = new Student({
           name: studentData.name,
           email: studentData.email,
           studentID: studentData.studentID,
           password: hashedPassword,
           class: classObj.name,
           DOB: studentData.DOB,
         });
   
         // Save the new student
         const savedStudent = await student.save();
         results.push(savedStudent);
   
         // Add the new student ID to the class "students" array
         classObj.students.push(savedStudent.studentID);
         await classObj.save();
   
     //     Create a new Grades document for each subject
         for (let subject of subjects) {
           const newGrades = new Grades({
             studentName: studentData.name,
             studentID: studentData.studentID,
             subject: subject,
             tests: [], // Empty tests array
             finalGrade: null,
           });
   
           await newGrades.save();
         }
       } catch (err) {
         console.log(err);
         res.status(400).send(err);
         return;
       }
     }
   
     res.status(200).send(results);
   });
   

   router.post("/registerClass", async (req, res) => {
     const { name } = req.body;
   
     if (!name) {
       return res.status(400).json({ message: "Please provide a class name." });
     }
   
     try {
       const classObj = new Class({
         name: name,
         students: [],
         tests: [],
       });
   
       const savedClass = await classObj.save();
       console.log("class created successfully");
       res.status(201).json({ message: "Class created successfully.", data: savedClass });
     } catch (err) {
       console.log(err);
       res.status(500).json({ message: "Internal server error" });
     }
   });
   


// router.post('/registerTest', async (req, res) => {
//      const { className, testName, maxScore, subject, date } = req.body;
 
//      try {
//          // Create a new TestInfo object
//          const newTestInfo = new TestInfo({
//              testName: testName,
//              class: className,
//              maxScore: maxScore,
//              subject: subject[0],
//              date: date
//          });
//          await newTestInfo.save();
 
//          // Update the Class with the new test name
//          await Class.updateOne(
//              { name: className },
//              { $push: { tests: testName } }
//          );
 
//          // Add the test to the Grades collection for each student
//          const classData = await Class.findOne({ name: className }).populate('students');
//          const students = classData.students;
//          console.log(students)
 
//          for (const student of students) {
//              // Find Grades collections with the specified subject and student ID
//              let grade = await Grades.findOne({ studentID: student[0], subject: subject[0] });
 
//              // If a matching Grades collection is not found, create a new one
//              if (!grade) {
//                  grade = new Grades({
//                      studentName: student.name,
//                      studentID: student.studentID,
//                      subject: subject[0],
//                      tests: [],
//                      finalGrade: null
//                  });
//                  await grade.save();
//              }
 
//              // Add the test object with a null score
//              await Grades.updateOne(
//                  { studentID: student.studentID, subject: subject[0] },
//                  { $push: { tests: { testName: testName, score: null } } }
//              );
//          }
 
//          res.status(200).json({ message: 'Test added successfully.' });
//      } catch (err) {
//          console.error(err.message);
//          res.status(500).send('Server error');
//      }
//  });
 
router.post('/registerTest', async (req, res) => {
     const { className, testName, maxScore, subject, date } = req.body;
 
     try {
         // Create a new TestInfo object
         const newTestInfo = new TestInfo({
             testName: testName,
             class: className,
             maxScore: maxScore,
             subject: subject[0],
             subject: subject,//new start-end
             date: date
         });
         await newTestInfo.save();

         console.log(newTestInfo)//new start-end
 
         // Update the Class with the new test name
         await Class.updateOne(
          //new start (commenting out these lines)
     //         { name: className },
     //         { $push: { tests: testName } }
     //     );
 
         // Add the test to the Grades collection for each student
     //     const classData = await Class.findOne({ name: className }).populate('students');
     //     const students = classData.students;
 
     //     for (const student of students) {
     //         // Update the Grades collection with the specified subject and student ID
     //         console.log(student)
     //         await Grades.updateOne(
     //             { studentID: student, subject: subject[0] },
     //             { $push: { tests: { testName: testName, score: null } } }
     //         );
     //     }
         //new end(actually removed these lines in original repo but i am just commenting)
 
         //new start (adding thses new lines of code)
         { name: className },
         { $push: { tests: testName } }
         );

         // Add the test to the Grades collection for each student
         const classData = await Class.findOne({ name: className }).populate('students');
         const students = classData.students;

         console.log(students)

         for (const student of students) {
              // Update the Grades collection with the specified subject and student ID
              console.log(student)
              try {
               await Grades.updateOne(
                   { studentID: student, subject: subject },
                   { $push: { tests: { testName: testName, score: null } } }
               );
           } catch (error) {
               console.error("Error updating grades:", error);
               throw error; // Or handle the error as appropriate for your application
           }

               }

               console.log('test added')
         //new end
         res.status(200).json({ message: 'Test added successfully.' });
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
     }
 });
 

 

module.exports = router;