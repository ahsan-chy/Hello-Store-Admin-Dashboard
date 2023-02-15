import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { ACCESS_TOKEN, STRAPI_API_URL } from '../../constants/strapi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import '../styles.css';
import { Typography } from '@mui/material';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0}}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  

function Orders () {
    const [search, setSearch] = useState('');
    const [orderData, setOrderData] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderData.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const getOrderDetails = async() => {
        try {
            let result = await axios.get(`${STRAPI_API_URL}/Orders?populate=*`, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                    })
                    setOrderData(result.data.data)
        } catch (error) {
            console.log(error.message);
    } }

useEffect(()=>{
    getOrderDetails()
},[])

    return(
        <div className='dashboard-content'>
            <Breadcrumb pagetitle={"Order Details"}/>
            {/* <DashboardHeader btnText="New Order" /> */}

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                <Typography variant="h2"  style={{fontSize:'28px', color:'#004b77'}}>Order Details</Typography>
                        <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => console.log("Search")} />
                    </div>
                </div>

            </div>
            <TableContainer component={Paper} sx={{ width:'auto' ,mx:3, p:2 }}>
      <Table aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell><strong style={{color:'#3498db'}}>ID</strong></TableCell>
            <TableCell><strong style={{color:'#3498db'}}>ORDER DATE</strong></TableCell>
            <TableCell><strong style={{color:'#3498db'}}>ORDER STATUS</strong></TableCell>
            <TableCell><strong style={{color:'#3498db'}}>COSTUMER</strong></TableCell>
            <TableCell><strong style={{color:'#3498db'}}>TOTAL PRICE</strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(orderData.length  > 0
            ? orderData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : orderData
          ).map((o, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {o.id}
              </TableCell>
              <TableCell>
              {o.attributes.date.slice(0,10).split('-').reverse().join('-')}
              </TableCell>
              <TableCell>
              <div>
                {o.attributes.orderStatus === 'pending' ?
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/833/833643.png"
                        alt='paid-icon'
                        className='dashboard-content-icon' />
                : o.attributes.orderStatus === 'accepted' ?
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5360/5360039.png"
                        alt='canceled-icon'
                        className='dashboard-content-icon' />
                : o.attributes.orderStatus === 'delivered' ?
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8905/8905668.png"
                        alt='completed-icon'
                        className='dashboard-content-icon' />
                : o.attributes.orderStatus === 'completed' ?
                <img
                    src="https://cdn-icons-png.flaticon.com/512/8968/8968525.png"
                    alt='completed-icon'
                    className='dashboard-content-icon' /> 
                :o.attributes.orderStatus === 'cancelled' ?
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2763/2763138.png"
                    alt='completed-icon'
                    className='dashboard-content-icon' />
                :null}
                <span>{o.attributes.orderStatus}</span>
                {/* {console.log(o.attributes.Customer.data.id)} */}
              </div>
              </TableCell>
              <TableCell>
                <div>
                    <span>{o.attributes.Customer.data.attributes.username}</span>
                </div>
              </TableCell>
              <TableCell>
              <span>{o.attributes.totalAmount} $</span>
              </TableCell>
              <TableCell>
              <Link to={`/orders/${o.id}`}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png"
                    alt='paid-icon'
                    className='dashboard-content-icon' />
                </Link>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={orderData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
        </div>
    )
}

export default Orders;