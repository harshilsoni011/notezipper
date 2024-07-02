import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../../constants/userConstants';
import axios from 'axios';

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    axios.get('/users/logout')
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    useEffect(() => {
        dispatch({ type: USER_LOGOUT })
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <></>
    )
}

export default Logout
