import React, {useEffect, useLayoutEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/white-logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ACCESS_TOKEN, STRAPI_API_URL, STRAPI_MEDIA_URL } from '../../constants/strapi';

function SideBar ({ menu }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState("")
    const [active, setActive] = useState(1);

    const userId = localStorage.getItem("adminId")
    const jwt = localStorage.getItem("jwt")
    console.log(userId)
    const getSingleUser = async(userId) => {
        try {
            let result = await axios.get(`${STRAPI_API_URL}/users?filters[id][$eq]=${userId}&populate=*`, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                    })
                   
                    !result ? console.log("No Products Found ") :  setLoginUser(result)
                    // console.log(result.data[0])
        } catch (error) {
            console.log(error.message);
    } }
    useLayoutEffect(()=>{
      getSingleUser(userId)
      console.log(loginUser)
    
    },[])

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])
    const logout = () => {
        // localStorage.setItem('Jwt_Token', jwt)
        if(jwt && userId)
        {
            localStorage.removeItem("jwt")
            localStorage.removeItem("adminId")
            navigate('/login')
        }
    }

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    {
                        !jwt || !userId ?
                            <img
                                src={logo}
                                alt="logo" />
                        :
                            <img
                                src={STRAPI_MEDIA_URL+loginUser?.data?.[0]?.image?.url ?? "https://cdn-icons-png.flaticon.com/512/9159/9159754.png"}
                                alt="logo" />
                    }
                        
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer' onClick={logout}>
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;