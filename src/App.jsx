import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Input} from '@mui/material';
import './App.css'
import axios from 'axios';
import RestoreIcon from '@mui/icons-material/Restore';


const CustomTableCell = ({ data, name, onChange }) => {
  const { isEditMode } =data;
  return (
    <TableCell align="left">
      {isEditMode ? (
        <Input
          value={data[name]}
          name={name}
          onChange={(e) => onChange(e, data)}
        />
      ) : (
        data[name]
      )}
    </TableCell>
  );
};

export default function BasicTable() {
    const [data, setData] = useState([]);
    const [previous, setPrevious] = useState({});

    useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
          const users = response.data.map((user)=>({
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address.city, 
            phone: user.phone,
            website: user.website,
            company: user.company.name,
            isEditMode: true
          }))
          setData(users);
        
      })
      .catch(error => {
          setError(error.message);
      })
  },[]);

  const toggleEditMode = (id) =>{
    setData((state) => {
      return state.map((user) => {
        if (user.id === id) {
          return { ...user, isEditMode: !user.isEditMode };
        }
        return user;
      });
    });
  }
  
  
  const onChange = (e, selectedUser) => {
    const { name, value } = e.target;
    const updatedData = data.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, [name]: value };
      }
      return user;
    });
    setData(updatedData); 
  };

  const onRevert = (id) => {
    const newData = data.map((user) => {
      if (user.id === id) {
        return previous[id] ? previous[id] : user;
      }
      return user;
    });
    setData(newData);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    toggleEditMode(id);
  };
  

  return (
    <>
    <div className="styledDiv">Learning Material UI</div>
    <Paper sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Address</TableCell>
            <TableCell >Phone No</TableCell>
            <TableCell >Website</TableCell>
            <TableCell >Company</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((user)=>(
            <TableRow key={user.id}>
              <TableCell>
              {user.isEditMode? (
                <>
                <IconButton
                  aria-label="done"
                  onClick={() => toggleEditMode(user.id)}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton
                  aria-label="restore"
                  onClick={() => onRevert(user.id)}
                >
                  <RestoreIcon />
                </IconButton>
              </>
              ):(
                <IconButton
                    aria-label="edit"
                    onClick={() => toggleEditMode(user.id)}
                  >
                    <EditIcon />
                </IconButton>                
              )}
              </TableCell>
                  <CustomTableCell {...{ data: user, name: "name", onChange }} />
                  <CustomTableCell {...{ data: user, name: "email", onChange }} />
                  <CustomTableCell {...{ data: user, name: "address", onChange }} />
                  <CustomTableCell {...{ data: user, name: "phone", onChange }} />
                  <CustomTableCell {...{ data: user, name: "website", onChange }} />
                  <CustomTableCell {...{ data: user, name: "company", onChange }} />
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    </Paper>
    </>
  );
}