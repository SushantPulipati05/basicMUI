import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Selector from './selector';
import CustomizedSwitches from './switch';
import { TablePagination } from '@mui/material';
import './App.css'
import BasicButtons from './button';


export default function BasicTable() {
  
  
  return (
    <>
    <div className="styledDiv">Learning Material UI</div>
    <Paper sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="center">Selector</TableCell>
            <TableCell align="center">Switch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>         
            <TableRow>
              <TableCell >Shawarma</TableCell>
              <TableCell align="right">500</TableCell>
              <TableCell align="right">low</TableCell>
              <TableCell align="right">low</TableCell>
              <TableCell align="right">lots</TableCell>
              <TableCell align='center'><Selector /></TableCell>
              <TableCell align='center'><CustomizedSwitches /></TableCell>

            </TableRow>
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
    </>
  );
}