import React, { useEffect, useState } from 'react'
import {  Container } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useParams } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'
import { Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ACCESS_TOKEN, STRAPI_API_URL, STRAPI_PRODUCTS_API_URL } from '../constants/strapi'
import { toast } from 'react-toastify'

const OrderDetails = () => {
    const [singleProduct, setSingleProduct] = useState("")
    const [orderData, setOrderData] = useState([])
    const [status, setStatus] = useState();
    const {id} = useParams()

const currOrderStatus = {
    "data":{
        "orderStatus":status
    }
}
const orderStatusChange = () => {
        try{
            axios.put(`http://localhost:1337/api/orders/${id}`, 
                currOrderStatus,
                {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                } }
           )
        }
        catch(error){
            console.log("Error")
            toast.error('Error in Change Order Status', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }   
    
    const getOrderDetails = async() => {
        try {
            let result = await axios.get(`${STRAPI_API_URL}/Orders?filters[id][$eq]=${id}&populate=*`, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                    })
                    !result ? console.log("Result Found Empty") : setOrderData(result.data.data)
                    
        } catch (error) {
            console.log("!ERROR ",error.message);
    } }
   
    const getSingleProducts = async(id1,id2,id3) => {
        try {
            let result = await axios.get(`${STRAPI_PRODUCTS_API_URL}?filters[id][$eq]=${id1}&filters[id][$eq]=${id2}&filters[id][$eq]=${id3}&populate=*`, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                    })
                    !result ? console.log("No Products Found ") : setSingleProduct(result)
        } catch (error) {
            console.log(error.message);
    } }

useEffect(()=>{
    orderStatusChange()
    console.log("OrderStaus", status)
},[status])

useEffect(()=>{
    getOrderDetails()    
    .then(()=>{
        getSingleProducts(3,4,5)
    })
    console.log(singleProduct)
},[id])

  return (
    <>
    <Breadcrumb pagetitle={"Order Detail Data"}/>
    {orderData.length !== 0 ?
    <div>
       <Grid2 sx={{mt:4}}>
        <Container>
        <Grid2 container  my={2}>
            <Grid2 item lg={6} md={6} sm={12} xs={12}>
                    <Box  sx={{
                    borderRadius: 1,
                    p: 2,
                    minWidth: 300,
                    boxShadow: 2,
                    mr:2
                    }}
                    >
                    <Typography variant='h6' sx={{color:"#001e3c", textAlign:"left", fontSize: 18, fontWeight:600}}>Order Details</Typography>
                    <TableContainer >
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>id</span></TableCell>
                        <TableCell align='right'>{orderData[0].id}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Order Date</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.date.slice(0,10).split('-').reverse().join('-')}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Total Amount</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.totalAmount} $</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Customer Id</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.Customer.data.id}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell><span>Order Status</span></TableCell>
                        <TableCell align='right'>
                        {/* <>
                        {status === 'pending' ?
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/833/833643.png"
                                style={{width:'40px', marginTop:'10px' }}
                                alt='paid-icon'
                                
                             />
                        : status === 'accepted' ?
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/5360/5360039.png"
                                style={{width:'40px', marginTop:'10px' }}
                                alt='canceled-icon'
                             />
                        : status === 'delivered' ?
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/8905/8905668.png"
                                style={{width:'40px', marginTop:'10px' }}
                                alt='completed-icon'
                             />
                        : status === 'completed' ?
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/8968/8968525.png"
                            style={{width:'40px', marginTop:'10px' }}
                            alt='completed-icon'
                         /> 
                        :status === 'cancelled' ?
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2763/2763138.png"
                            style={{width:'40px', marginTop:'10px' }}
                            alt='completed-icon'
                         />
                        :null}
                             </> */}
                            <FormControl sx={{ m: 1, }} size="small">
                            <InputLabel id="demo-select-small">Order Status</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="Order Status"
                                onChange={(e) => setStatus(e.target.value)}
                                defaultValue={orderData[0].attributes.orderStatus}
                            >
                                <MenuItem value="pending">pending &nbsp; <img
                                src="https://cdn-icons-png.flaticon.com/512/833/833643.png"
                                style={{width:'18px', marginTop:'5px', marginLeft:'auto' }}
                                alt='paid-icon'/></MenuItem>
                                <MenuItem value="accepted">accepted  &nbsp;<img
                                src="https://cdn-icons-png.flaticon.com/512/5360/5360039.png"
                                style={{width:'21px', marginTop:'5px', marginLeft:'auto' }}
                                alt='paid-icon'/></MenuItem>
                                <MenuItem value="delivered">delivered &nbsp;<img
                                src="https://cdn-icons-png.flaticon.com/512/8905/8905668.png"
                                style={{width:'18px', marginTop:'5px', marginLeft:'auto' }}
                                alt='paid-icon'/></MenuItem>
                                <MenuItem value="cancelled">cancelled &nbsp;<img
                                src="https://cdn-icons-png.flaticon.com/512/2763/2763138.png"
                                style={{width:'18px', marginTop:'5px', marginLeft:'auto' }}
                                alt='paid-icon'/></MenuItem>
                                <MenuItem value="completed">completed &nbsp;<img
                                src="https://cdn-icons-png.flaticon.com/512/8968/8968525.png"
                                style={{width:'18px', marginTop:'5px', marginLeft:'auto' }}
                                alt='paid-icon'/></MenuItem>
                            </Select>
                            </FormControl>
                            
                        </TableCell>
                        </TableRow>
                        <TableRow>
                            
                        
                        </TableRow>



                    </TableBody>
                </Table>
                </TableContainer>    
                </Box>
            </Grid2>

            <Grid2 item lg={6} md={6} sm={12} xs={12}>
                    <Box  sx={{
                    borderRadius: 1,
                    p: 2,
                    minWidth: 300,
                    boxShadow: 2,
                    mr:2
                    }}
                    >
                    <Typography variant='h6' 
                    sx={{color:"#001e3c", textAlign:"left", fontSize: 18, fontWeight:600}}>
                        Shipping Details</Typography>
                    <TableContainer >
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>id</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.shippingDetails.id}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>FullName</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.shippingDetails.fullName}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Email</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.shippingDetails.email}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Phone</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.shippingDetails.phone}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Delivery Address</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.shippingDetails.deliveryAddress}</TableCell>
                        </TableRow>
                        <TableRow
                        sx={{ border: 0 }}
                        >
                        <TableCell><span>Additional Note</span></TableCell>
                        <TableCell align='right'>{orderData[0].attributes.shippingDetails.additionalNote}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                </TableContainer>    
                </Box>
            </Grid2>
            
        </Grid2>

        </Container>
    </Grid2>
    <Grid2 sx={{ my:5}}>
        <Container>
        <Grid2 item lg={12} md={6} sm={12} xs={12}>
            <Box  sx={{
            borderRadius: 1,
            p: 2,
            minWidth: 300,
            boxShadow: 2,
            mr:2
            }}
            >
               <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:600}} >Id</TableCell>
                        <TableCell sx={{fontWeight:600}} >Image</TableCell>
                        <TableCell sx={{fontWeight:600}} >Product Title</TableCell>
                        <TableCell sx={{fontWeight:600}}>Category</TableCell>
                        <TableCell sx={{fontWeight:600}}>Quantity </TableCell>
                        <TableCell sx={{fontWeight:600}}>SubTotal </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* <div>{console.log(productData)}</div> */}
                    
                    {orderData[0].attributes.productDetails  ? orderData[0].attributes.productDetails.map((od, index)=>(
                        
                        <TableRow key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* {getSingleProducts(od.id)} */}
                        <TableCell> {od.id}</TableCell>
                        <TableCell>
                            <div style={{ width:'65px', height:'100%' }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/8968/8968525.png" alt="product image"
                                style={{width:'100%', height:'100%' }} />
                            </div>
                        </TableCell>
                        <TableCell component="th" scope="row">productTitle</TableCell>
                        <TableCell>Mobile Category</TableCell>
                        <TableCell>{od.quantity}</TableCell>
                        <TableCell>{od.subTotal} 💲</TableCell>
                        </TableRow>

                    ))
                    :
                    <div>Nothing found</div>
                }
                    {/* {() => calculateTotal(subTotal)} */}
                     <TableRow align="right">
                        <TableCell rowSpan={4} />
                        <TableCell rowSpan={4} />
                        <TableCell rowSpan={4} />
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={1}>Total <b> Amount:</b></TableCell>
                        <TableCell> {orderData[0].attributes.totalAmount} 💲</TableCell>
                    </TableRow>

                    </TableBody>
                </Table>
                </TableContainer> 
                </Box>
        
        </Grid2>
        </Container> 
    </Grid2>
    </div>
    :
    <div>No Product Found</div>
}
    </>
  )
}

export default OrderDetails