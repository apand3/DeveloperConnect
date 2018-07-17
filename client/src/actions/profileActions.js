import axios from 'axios';
import {toastr} from 'react-redux-toastr'
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILES
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
export const addExperience = (experienceData, history) => dispatch => {
  axios
    .post('/api/profile/experience', experienceData)
    .then(res => //{
     // toastr.success('Success', 'Experience Added');
    history.push('/dashboard')
 // }
)
    .catch(err =>{
      toastr.error('Error', 'Experience Added')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};
export const addEducation = (educationData, history) => dispatch => {
  console.log(educationData);
  axios
    .post('/api/profile/education', educationData)
    .then(res => {
      toastr.success('Success', 'Education Added');
    history.push('/dashboard')
  }
)
    .catch(err =>{
      toastr.error('Error', 'Error occoured')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};
export const deleteExperience = (id) => dispatch => {
  
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      toastr.success('Success', 'Successfull deleted');
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })
  }
)
    .catch(err =>{
      toastr.error('Error', 'Error occoured')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};
export const deleteEducation = (id) => dispatch => {
  
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      toastr.success('Success', 'Successfull deleted');
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })
  }
)
    .catch(err =>{
      toastr.error('Error', 'Error occoured')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
     
    dispatch({
      type:GET_PROFILES,
      payload:res.data
    })
  }
)
    .catch(err =>{
      toastr.error('Error', 'Error occoured')
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    });
};
export const getProfileByHandle = (id) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${id}`)
    .then(res => {
     
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })
  }
)
    .catch(err =>{
      toastr.error('Error', 'Error occoured')
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    });
};
//getProfileByHandle