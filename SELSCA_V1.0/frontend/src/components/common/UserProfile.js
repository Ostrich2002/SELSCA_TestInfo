import { Typography, Grid, Container, Table, TableContainer, TableBody, TableRow, TableCell, Box, Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const UserProfile = () => {
    const [role , setRole] = useState(localStorage.getItem("role"))
    const [user , setUser] = useState("")

    //function for checking the json web token and fetchs the user information from the backend 
    const checkLogin = async () => {
        try {
            Swal.fire({
                title: 'loading...',
                backdrop : 'true',
                allowOutsideClick : false,
            })
            Swal.showLoading();
            const res = await axios.get('http://localhost:5000/login/isUserAuth' , {
                headers : {
                    "x-access-token" : localStorage.getItem("token"),
                    "role" : role
                }
            })
            Swal.close()
            setUser(res.data.user)
            console.log(user)
        }
        catch (err) {
            Swal.fire({
                icon : "error",
                title : err.response.data.message
            })
        }
    }

    //running the fetch function on first render of the page
    useEffect(() => {
        checkLogin()
    }, [])


    return(
        <Container sx={{ paddingTop: "50px", display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', margin: '50px auto', maxWidth: '90vw' }}>
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:2 }}>
                <AccountCircleIcon sx={{ fontSize: 100 }} />
                <Typography variant="h4" sx={{ textAlign:'center' }}>Basic Information</Typography>
            </Box>
            <TableContainer sx={{ backgroundColor:'#D9D9D9',marginBottom : 4 ,borderRadius:1, marginTop:3, padding:2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{user.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                        {(role === "teacher" || role === "student") &&
                        <>
                            <TableRow>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>{user.DOB}</TableCell>
                            </TableRow>
                        </>  
                        }
                        {role === "student" && 
                        <>
                            <TableRow>
                                <TableCell>Class</TableCell>
                                <TableCell>{user.class}</TableCell>
                            </TableRow>
                        </>
                        }
                    </TableBody>
                </Table>
            </TableContainer >
        </Container>
    )
}

export default UserProfile;
