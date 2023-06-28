import React, { useState, useEffect } from 'react';
import { Container, Box, Select, MenuItem, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';



function GradesCenter() {
    const [classValue, setClassValue] = useState("");
    const [subject, setSubject] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [tests, setTests] = useState([]);
    const [grades, setGrades] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [inputValues , setInputValues] = useState({})
    const [addTestDialogOpen, setAddTestDialogOpen] = useState(false);
    const [testName, setTestName] = useState("");
    const [maxScore, setMaxScore] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetchClasses();
    }, []);

    const getGrades = async () => {
        try {
            const response = await axios.post('http://localhost:5000/grades/getGrades', {
                studentIDs : [1,2,3],
                subjects: [subject]
            });
            const data = response.data;

            if (!data || data.length === 0) {
                setStudentData([]);
                setTests([]);
                return;
            }
            setStudentData(data);

            // Extract all test names from the data
            const allTests = [];
            data.forEach(student => {
                student.tests.forEach(test => {
                    if (!allTests.includes(test.testName)) {
                        allTests.push(test.testName);
                    }
                });
            });
            setTests(allTests);

            // Initialize grades
            const initialGrades = data.map(student => {
                const grades = {
                    _id: student._id,
                    studentName: student.studentName,
                    studentID: student.studentID,
                    tests: {}
                };
                student.tests.forEach(test => {
                    grades.tests[test.testName] = test.score;
                });
                return grades;
            });
            setGrades(initialGrades);
        } catch (error) {
            console.error('Failed to fetch grades:', error);
        }
    }

    const handleChange = (e, i, item) => {
        const updatedGrades = [...grades];
        updatedGrades[i].tests[item] = Number(e.target.value);
        setGrades(updatedGrades);
    }

    const submitGrades = async () => {
        try {
            Swal.fire({
                title: "Please Wait",
                text: "Uploading",
                backdrop: "true"
            });
            Swal.showLoading();

            const formattedGrades = grades.map(grade => {
                const tests = Object.keys(grade.tests)
                    .map(key => {
                        return {
                            testName: key,
                            score: grade.tests[key] || 0
                        };
                    });
                return {
                    studentID: grade.studentID,
                    tests: tests
                };
            });

            const gradesData = {
                studentIDs: studentData.map(data => data.studentID),
                subject: subject,
                class: classValue,
                grades: formattedGrades,
            };

            await axios.post("http://localhost:5000/grades/submitGrades", gradesData);

            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Grades successfully submitted!'
            }).then(function () {
                getGrades();
            });

        } catch (error) {
            console.error('Failed to update grades:', error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: error.message
            });
        }
    };

    const handleAddTest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register/registerTest", {
                testName: testName,
                className: classValue,
                subject: subject,
                maxScore: maxScore,
                date: date,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Test added successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                getGrades();
                setAddTestDialogOpen(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error adding test",
                    text: "Something went wrong",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error adding test",
                text: error.message,
            });
            console.error("Error adding test:", error);
        }
    };

    const fetchClasses = async () => {
        var tempClasses = await axios.get('http://localhost:5000/info/allClasses')
        setAllClasses(tempClasses.data)
    }


    return (
        <Container sx={{ paddingTop: "50px", display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', margin: '50px auto', maxWidth: '90vw' }}>
            <Typography variant="h1" sx={{ marginBottom: 6}}>Grades Center</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: 3  }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">Class: </Typography>
                    <Select 
                        value={classValue}
                        label="Class"
                        onChange={(e) => { setClassValue(e.target.value) }}
                        sx={{ margin: '0 10px' }}
                    >
                        {allClasses.map((className, index) => (
                            <MenuItem key={index} value={className}>{className}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">Subject: </Typography>
                    <Select 
                        value={subject}
                        label="Subject"
                        onChange={(e) => { setSubject(e.target.value); setInputValues({}) }}
                        sx={{ margin: '0 10px' }}
                    >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Maths">Maths</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Social">Social</MenuItem>
                    </Select>
                </Box>

                <Button variant="contained" color="primary" onClick={getGrades} sx={{ backgroundColor: '#4E4E4E' }}>Get grades</Button>
            </Box>

            <Box sx={{ width: '100%', overflowX: 'auto', marginBottom: 2, borderRadius: '10px' }}>
    <Table sx={{ borderCollapse: 'collapse' }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ border: '1px solid #000', backgroundColor: '#404040', color: '#FFF' }}>
            <Typography variant="h5">
              Student Name
            </Typography>
          </TableCell>
          {tests.map((item, i) => (
            <TableCell key={i} sx={{ border: '1px solid #000', backgroundColor: '#404040', color: '#FFF' }}>
              <Typography variant="h5">
                {item}
              </Typography>
            </TableCell>
          ))}
                            <TableCell>
                                <Button variant="contained" sx={{ backgroundColor : "primary"}} onClick={() => setAddTestDialogOpen(true)}>Add Test</Button>

                                <Dialog open={addTestDialogOpen} onClose={() => setAddTestDialogOpen(false)}>
                                    <DialogTitle>Add a new test</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter the relevant information for the new test.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="testName"
                                            label="Test Name"
                                            type="text"
                                            fullWidth
                                            value={testName}
                                            onChange={(e) => setTestName(e.target.value)}
                                        />
                                        <br></br>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="maxScore"
                                            label="Max Score"
                                            type="Number"
                                            fullWidth
                                            value={maxScore}
                                            onChange={(e) => setMaxScore(e.target.value)}
                                        />
                                        <br></br>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="date"
                                            type="Date"
                                            fullWidth
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setAddTestDialogOpen(false)} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAddTest} color="primary">
                                            Add Test
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                        </TableHead>
      <TableBody>
        {grades.map((grade, i) => (
          <TableRow key={i}>
            <TableCell sx={{ border: '1px solid #000', width: 150, textAlign: 'center', backgroundColor: "#808080", color: '#FFF' }}>
              <Typography variant="overline">
                {grade.studentName}
              </Typography>
            </TableCell>
            {tests.map((test, j) => (
              <TableCell key={`${i}-${j}`} sx={{ border: '1px solid #000', backgroundColor: "#ffffff1", color: '#4E4E4E', padding: '0px' }}>
                                        <TextField
                                                type="number"
                                                id={`${i}-${test}`}
                                                value={inputValues[`${i}-${test}`] || grade.tests[test] || ""}
                                                variant="outlined"
                                                sx={{ margin: 0 }}  
                                                onChange={(e) => {
                                                    setInputValues(prevValues => ({
                                                        ...prevValues,
                                                        [`${i}-${test}`]: e.target.value,
                                                    }));
                                                    handleChange(e, i, test);
                                                }}
                                                InputLabelProps={{
                                                    sx: { color: "#07b86c" }
                                                }}
                                            /> 
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </Box>

            <Button variant="contained" color="success" onClick={submitGrades} sx={{ backgroundColor: '#4E4E4E', marginTop: 3 , marginBottom : 3 }}>Submit Grades</Button>
        </Container>
    );
}

export default GradesCenter;
