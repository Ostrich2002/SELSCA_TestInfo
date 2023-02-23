import React from 'react';
import { Container , Box, CssBaseline } from '@mui/material';
import {Outlet, Route , Routes } from 'react-router-dom'
import AdminNavbar from './components/admin/AdminNavbar.js';
import Register from './components/admin/register/Register.js';
import { ThemeProvider} from "@mui/material";
import MainTheme from './styles/styles.js';
import Login from './components/common/Login';
import UserProfile from './components/common/UserProfile.js';
import TeacherNavbar from './components/teacher/TeacherNavbar.js';
import StudentNavbar from './components/student/StudentNavbar.js';
import UserData from './components/admin/UserData.js';
import GradesCenter from './components/teacher/GradesCenter.js';


function App() {
  //conditionally showing the required layouts for the user 
  const AdminLayout = () => {
    return (
      <Box>
        <AdminNavbar />
        <Container>
          <Outlet />
        </Container> 
      </Box>
    );
  };

  const TeacherLayout = () => {
    return (
      <Box>
        <TeacherNavbar />
        <Container>
          <Outlet />
        </Container> 
      </Box>
    );
  };

  const StudentLayout = () => {
    return (
      <Box>
        <StudentNavbar />
        <Container>
          <Outlet />
        </Container> 
      </Box>
    );
  };

  return(

    <ThemeProvider theme={MainTheme}> 
    {/* the main theme can be found in the ./components/styles/styles.js file  */}
    <CssBaseline />
  
    <Routes>
      <Route path ='/' element={<Login />} />
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='register' element={<Register />} />
        <Route path='userprofile' element={<UserProfile />} />
        <Route path='userData' element={<UserData />} />
      </Route>
      <Route path='/teacher' element={<TeacherLayout />}>
          <Route path='userprofile' element={<UserProfile />} />
          <Route path='gradescenter' element={<GradesCenter />} />
      </Route>
      <Route path='/student' element={<StudentLayout />} >
      <Route path='userprofile' element={<UserProfile />} />
      </Route>
    </Routes>

    </ThemeProvider>
    )
}

export default App;