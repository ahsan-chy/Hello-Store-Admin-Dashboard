import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import { ACCESS_TOKEN, STRAPI_API_URL } from '../../constants/strapi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [orderData, setOrderData] = useState([])

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

useEffect(() => {
    setPagination(calculateRange(orderData, 5));
    setOrders(sliceData(orderData, page, 5));
}, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orderData.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(orderData, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <Breadcrumb pagetitle={"Order Details"}/>
            <DashboardHeader
                btnText="New Order" />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Orders List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>ORDER DATE</th>
                        <th>ORDER STATUS</th>
                        <th>COSTUMER</th>
                        <th>TOTAL PRICE</th>
                        <th> </th>
                    </thead>
                    {orderData.length !== 0 ?
                        <tbody>
                            {orderData.map((o, index) => (
                                <tr key={index}>
                                    <td><span>{o.id}</span></td>
                                    <td><span>{o.attributes.date.slice(0,10).split('-').reverse().join('-')}</span></td>
                                    <td>
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
                                    </td>
                                    <td>
                                        <div>
                                            {/* <img 
                                                src={STRAPI_MEDIA_URL+imgurl[o.attributes.Customer.data.id]}
                                                className='dashboard-content-avatar'
                                                alt={`https://cdn-icons-png.flaticon.com/512/1144/1144709.png`} /> */}
                                            <span>{o.attributes.Customer.data.attributes.username}</span>
                                        </div>
                                    </td>
                                    <td><span>{o.attributes.totalAmount} $</span></td>
                                    <td>
                                        <Link to={`/orders/${o.id}`}>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png"
                                            alt='paid-icon'
                                            className='dashboard-content-icon' />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orderData.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders;