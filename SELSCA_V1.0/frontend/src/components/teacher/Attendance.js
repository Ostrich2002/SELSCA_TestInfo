import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import Swal from 'sweetalert2';


const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allClasses , setAllClasses] = useState([])


  useEffect(() => {
    fetchClasses();
}, []);


  useEffect(() => {
    if (selectedClass) {
      axios.post('http://localhost:5000/info/getClass', { class: selectedClass })
        .then((response) => {
          const fetchedStudents = response.data;
          setStudents(fetchedStudents);
          setAttendance(
            fetchedStudents.map((student) => ({
              name: student.name,
              present: false,
              absent: false,
              late: false,
            }))
          );
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedClass]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  

  const handleStatusChange = (studentIndex, status) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = [...prevAttendance];
      const studentRecord = updatedAttendance[studentIndex];
      updatedAttendance[studentIndex] = {
        ...studentRecord,
        present: false,
        absent: false,
        late: false,
        [status]: !studentRecord[status],
      };
      return updatedAttendance;
    });
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
  
    const attendanceData = attendance.map((student, index) => {
      const status = student.present
        ? 'present'
        : student.absent
        ? 'absent'
        : 'late';
      return {
        name: students[index].name,
        class: selectedClass,
        month: selectedDate.getMonth() + 1,
        date: selectedDate,
        status: status,
      };
    });
    
  
    try {
      await axios.post('http://localhost:5000/info/submitAttendance', attendanceData);
      setIsSubmitting(false);
  
      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Attendance Submitted',
        text: 'The attendance has been successfully uploaded.',
      });
    } catch (error) {
      setIsSubmitting(false);
  
      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while submitting attendance.',
      });
    }
  };

  const fetchClasses = async () => {
    var tempClasses = await axios.get('http://localhost:5000/info/allClasses')
    setAllClasses(tempClasses.data)
  }
  

  return (
    <Container sx={{ paddingTop: "50px", display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', margin: '50px auto', maxWidth: '90vw' }}>
    <Typography variant="h1" sx={{ marginBottom: 6}}>Attendance Portal</Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Typography variant="h5" sx={{ marginLeft: '1rem' }}>
              Date:
            </Typography>
            <TextField
              id="date"
              type="date"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              sx={{ marginLeft: '1rem' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
  
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Typography variant="h5" sx={{ marginLeft: '1rem' }}>
              Class:
            </Typography>
            <FormControl>
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select 
                        value={selectedClass}
                        label="Class"
                        onChange={(e) => { setSelectedClass(e.target.value) }}
                        sx={{ margin: '0 10px' }}
                    >
                        {allClasses.map((className, index) => (
                            <MenuItem key={index} value={className}>{className}</MenuItem>
                        ))}
                    </Select>
            </FormControl>
          </div>
  

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Present</TableCell>
              <TableCell>Absent</TableCell>
              <TableCell>Late</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((student, index) => (
              <TableRow key={student.name}>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={student.present}
                    onChange={() => handleStatusChange(index, 'present')}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                      checked={student.absent}
                      onChange={() => handleStatusChange(index, 'absent')}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.late}
                      onChange={() => handleStatusChange(index, 'late')}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
  submitError && (
    <p style={{ color: 'red', marginTop: '1rem' }}>{submitError}</p>
  )
}
<Button
  onClick={handleSubmit}
  disabled={isSubmitting}
  variant="contained"
  sx={{ marginTop: '1rem' , marginBottom : "10px" }}
>
  {isSubmitting ? (
    <CircularProgress size={24} />
  ) : (
    'Submit Attendance'
  )}
</Button>
      </Container>
    );
  };
  
  export default Attendance;
  