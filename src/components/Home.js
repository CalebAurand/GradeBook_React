import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import cookie from 'cookie';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(3, 190, 253, .6)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(0, 0, 0, .03)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Home(props) {
  const cookies = cookie.parse(document.cookie);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [idOfClass, setIDOfClass] = useState(null);
  const trimdJWT = cookies["userJWT"];

  useEffect( () => {
    fetch('http://localhost:9000/view-count-classes',{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("fetchClasses response", response);
      setClasses(response);
    })
  }, [])

  const ITEM_HEIGHT = 40;
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  }

  const deleteClass = (classId) => {
    console.log("going to delete class with ID: ", classId);
    fetch(`http://localhost:9000/delete-class/${classId}`,{
      method: 'DELETE',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>console.log(res.status))
    .then(response=>{
      console.log("delete classes response", response);
      setDeleteId(null);
      setIDOfClass(null);
      setClasses([]);
    })
  }

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <h2>Classes</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Class Name</StyledTableCell>
            <StyledTableCell sx={{maxWidth: 20}} align="center">Subject</StyledTableCell>
            <StyledTableCell align="center"># of Students</StyledTableCell>
            <StyledTableCell align="center">Settings</StyledTableCell>
          </TableRow>
        </TableHead>

        {classes.length > 0 && <TableBody>
          {classes.map((classT, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" align="center" sx={{fontWeight: 'bold', width: '8.2vw'}}scope="row">
                <Link to={`/class/${classT.id}`}>{classT.class_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{width: '6vw', maxWidth: '25vw'}} align="center">{classT.class_subject}</StyledTableCell>
              <StyledTableCell sx={{width: '6vw', minWidth: '7vw'}} align="center">{`${classT.count}`}</StyledTableCell>
              <StyledTableCell sx={{width: '2vw', minWidth: '2vw'}} align="center">
                <IconButton
                  aria-label="more" id="long-button" aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined} aria-haspopup="true"
                  onClick={(e)=>{
                    handleClick(e); 
                    setIDOfClass(classT.id);
                  }}
                  >
                  <MoreHorizIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
        ))}
        </TableBody>}
        <Menu id="long-menu" MenuListProps={{'aria-labelledby':'long-button',}}
          anchorEl={anchorEl} open={open} onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
          >
          <MenuItem onClick={()=>{
            navigate(`/update-class/${idOfClass}`)
          }}>
            Update
          </MenuItem>
          <MenuItem onClick={()=>{
            setShowWarning(true);
            setDeleteId(idOfClass);
            handleClose();
          }}>
            Delete
          </MenuItem>
        </Menu>
      </Table>
      <Link to="/new-class">
      <Button variant="outlined" sx={{fontWeight: 'bold'}}>
        <AddIcon fontSize="small" sx={{color: 'blue'}}/>
        Add Class
      </Button>
      </Link>
      </TableContainer>
      {showWarning && <Alert severity="warning" sx={{zIndex: 200, left: '28%', top: '38%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '39vw', borderRadius: '10px'}}>
        <AlertTitle sx={{fontWeight: 'bold'}}>Warning</AlertTitle>
        The DELETE you are about to perform is permanent — <strong>Are you sure?</strong>
        <div>
          <Button variant="contained" sx={{display: 'inline-block', marginRight: 10}}
            onClick={()=>{
              deleteClass(deleteId); 
              setShowWarning(false);
              }
            }
          >
            Yes
          </Button>
          <Button variant="contained" sx={{display: 'inline-block',}}
            onClick={()=>{
              setDeleteId(null);
              setIDOfClass(null);
              setShowWarning(false);
              }
            }
          >
            No
          </Button>
        </div>
      </Alert>}
    </div>
  );
}




/**
 * previous width of the classes table was '70vw'
 * <TableContainer sx={{width: '30vw'}} component={Paper}>
        <h2>Assignments</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '10vw', minWidth: 100 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell sx={{maxWidth: 20}} align="center">Due</StyledTableCell>
            
            {/* {loggedInBool && <StyledTableCell align="center">Delete</StyledTableCell>} *}
            </TableRow>
            </TableHead>
    
            <TableBody>
              {listings.map((list, index) => (
                <StyledTableRow key={list.id}>
                  <StyledTableCell component="th" sx={{fontWeight: 'bold', width: '8.2vw'}}scope="row">
                    <Link to={`/details/${list.id}`}>{list.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell sx={{width: '6vw', minWidth: '7vw'}} align="right">{`${list.hours.open} - ${list.hours.close}`}</StyledTableCell>
                  {/* {loggedInBool && <StyledTableCell align="center"><DeleteIcon onClick={()=>removeListing(index)} sx={{color: 'red', cursor: 'pointer'}}></DeleteIcon></StyledTableCell>} *}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */