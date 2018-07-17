import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
export const registerUser=(userdata,history)=>dispatch=>{
    axios.post('/api/users/register',userdata)
     .then(result=>{
      history.push('/login');
     })
     .catch(err=>
    dispatch({
            type:GET_ERRORS,
            payload:err.response.data
    })

    
    );
}
export const loginUser=(userData)=>dispatch=>{
    axios.post('/api/users/login',userData)
    .then(res=>{
const {token}=res.data;
localStorage.setItem('jwtToken',token);
setAuthToken(token);
const decode=jwt_decode(token);
dispatch(setCurrentUser(decode));
    })
    .catch(err=>
    
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
    })
    )
}
export const setCurrentUser=(decode)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decode
    }
}
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    window.location.href='/login';
  };