import React, { useEffect, useState } from "react";
import {  Typography,  Grid,  TextField, Button,  MenuItem,  Select,  Table,TableHead,  TableRow,TableBody,   TableCell,FormControl,  InputLabel,  Box,  Card,  CardContent,} from "@mui/material";
import { makeStyles } from "@mui/styles";
import swal from "sweetalert2";
import axios from "axios";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    "& .MuiTextField-root": {
      marginBottom: "10px",
    },
  },
  tableContainer: {
    marginTop: "30px",
  },
});
function TestInfoForm() {
    const classes = useStyles();
    const [testName, setTestName] = useState("");
    const [testClass, setTestClass] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [maxScore, setMaxScore] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [gradesDueDates, setGradesDueDates] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!testName || !testClass || !subject || !date || !maxScore || !syllabus) {
        swal.fire({
          title: "Please fill out all required fields",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      try {
        await axios.post("http://localhost:5000/info/submitTestInfo", {
          testName,
          testClass,
          subject,
          date,
          maxScore,
          syllabus,
          gradesDueDates,
        });
        swal.fire({
          title: "Test information submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setTestName("");
        setTestClass("");
        setSubject("");
        setDate("");
        setMaxScore("");
        setSyllabus("");
        setGradesDueDates("");
      } catch (err) {
        swal.fire({
          title: "Error submitting test information",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
  
    return (
      <>
        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Test Information
          </Typography>
        </Box>
        <Card>
          <CardContent>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Test Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                <Select
                    labelId="test-select-label"
                    id="test-select"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  variant="outlined"
                  >
                    <MenuItem value="fa1">fa1</MenuItem>
                    <MenuItem value="fa2">fa2</MenuItem>
                    <MenuItem value="sa1">sa1</MenuItem>
                    <MenuItem value="fa3">fa3</MenuItem>
                    <MenuItem value="fa4">fa4</MenuItem>
                    <MenuItem value="sa2">sa2</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Class:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Class"
                    variant="outlined"
                    value={testClass}
                    onChange={(e) => setTestClass(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Subject:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Maths">Maths</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
              </Select>

                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Max Score:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Max Score"
                    variant="outlined"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Syllabus:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Syllabus"
                    variant="outlined"
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    fullWidth
                  />
                </Grid>
                    
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Grades Due Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Grades Due Date"
                    type="date"
                    variant="outlined"
                    value={gradesDueDates}
                    onChange={(e) => setGradesDueDates(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" sx={{ mt: 2 }} type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
  
  export default TestInfoForm;