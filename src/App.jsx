import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Selector from './components/selector';
import CustomizedSwitches from './components/switch';
import { TablePagination } from '@mui/material';
import './App.css'
import BasicButtons from './components/button';
import DataDisplay from './components/dataDisplay';
import axios from 'axios';


export default function BasicTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        })
    },[]);

  return (
    <>
    <div className="styledDiv">Learning Material UI</div>
    <Paper sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Address</TableCell>
            <TableCell >Phone No</TableCell>
            <TableCell >Website</TableCell>
            <TableCell >Company</TableCell>
            <TableCell >Switch</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>            
            {data.map((item) => (
              <>
              <TableRow>
                <TableCell key={item.id}>{item.name}</TableCell>
                <TableCell >{item.email}</TableCell>
                <TableCell >{item.address.street} ,{item.address.city} ,{item.address.zipcode}</TableCell>
                <TableCell >{item.phone}</TableCell>
                <TableCell >{item.website}</TableCell>
                <TableCell >{item.company.name}</TableCell>
              </TableRow>
              </>
            ))}            
        </TableBody>
        
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count='50'
        rowsPerPage="10"
        page="5"
        />
    </Paper>
    <div className='styledButton'>
      <BasicButtons />
    </div>
    <div>
      <DataDisplay /> 
    </div>
    </>
  );
}