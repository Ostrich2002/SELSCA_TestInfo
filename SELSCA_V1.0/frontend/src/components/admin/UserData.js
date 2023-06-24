import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';


const UserData = () => {
    const [userType , setUserType] = useState("");
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
      ];
      const rows =[]

    const handleClick = async () => {
        const res = await axios.get('http://localhost:5000/userData/test')
        console.log(res)

        if (userType === "teacher") {
            return true
        }
    }

    const handleChange = async (e) => {
        setUserType(e.target.value)
        console.log(userType)
        
    }

    return (
        <>
        <Select value={userType} label="Role"
                            sx={{
                                backgroundColor : "#a3a2a2",
                                color : "#242424"
                            }}
                             onChange={(e) => {handleChange(e)}}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                            </Select>
        <Button onClick={() => {console.log(userType)}}>show</Button>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        </>
    )
}

export default UserData;