import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { url } from "../../constants"
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [jobPoster,setJobPoster]=useState([]);
  const [workers,setWorkers]=useState([]);
  const [users,setUsers]=useState([]);
  const [jobs,setJobs]=useState([]);
  const [industries,setIndustries]=useState([]);
  const [countries,setCountries]=useState([]);
  const [province,setProvince]=useState([]);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Admin',
        email: 'admin@circleconnect.com'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Admin',
      email: 'admin@circleconnect.com'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    if (email !== 'admin@circleconnect.com' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-omar-darboe.png',
      name: 'Admin',
      email: 'admin@circleconnect.com'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  const getUsers=async()=>{
    const res=await axios.get(`${url}/user/getuser`);
    if(res.data.status===1){
      setUsers(res.data.list)
      setWorkers(res.data.list.filter((each)=>each.type==="worker"));
      setJobPoster(res.data.list.filter((each)=>each.type!=="worker"))
    }else{
      setJobPoster([])
      setWorkers([])
      setUsers([])
    }
    }
  const getJobs=async()=>{
    const res=await axios.get(`${url}/job/search`);
    if(res.data.status===1){
      setJobs(res.data.list)
    }else{
      setJobs([])
    }
    }
  const getIndustries=async()=>{
    const res=await axios.get(`${url}/industry/get`);
    if(res.data.status===1){
      setIndustries(res.data.list)
    }else{
      setIndustries([])
    }
    }
  const getCountries=async()=>{
    const res=await axios.get(`${url}/auth/country`);
    if(res.data.status===1){
      setCountries(res.data.list)
    }else{
      setCountries([])
    }
    }
  const getProvince=async(code)=>{
    console.log(code);
    const data={
      "countryCode":code
    }
    const res=await axios.post(`${url}/auth/province`,data);
    if(res.data.status===1){
      setProvince(res.data.list)
    }else{
      setProvince([])
    }
    }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        jobPoster,
        getUsers,
        workers,
        users,
        getJobs,
        jobs,
        industries,
        getIndustries,
        countries,
        getCountries,
        province,
        getProvince
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
