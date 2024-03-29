import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import { url } from "../../constants";
import { baseAxios } from "./utils/base-axios";
import axios from "axios";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [province, setProvince] = useState([]);
  const [applications, setApplications] = useState([]);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem("token") ? true : false;
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Admin",
        email: "admin@circleconnect.com",
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
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
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Admin",
      email: "admin@circleconnect.com",
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signIn = async (email, password) => {
    // setLoading(true);
    try {
      const resp = await axios.post(`${url}/auth/login`, { email, password });
      if (resp.status === 200) {
        const data = resp?.data;
        const user = {
          id: data?.id,
          avatar: "/assets/avatars/avatar-omar-darboe.png",
          name: data?.username,
          email: "admin@circleconnect.com",
        };
        localStorage.setItem("token", data?.token);
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user,
        });
      }
    } catch (error) {
      signOut();
      if (error?.response?.status === 400) {
        throw new Error("Please check your email and password");
      } else {
        throw new Error(error.message);
      }
    }
    // setLoading(false);
  };

  const signUp = async (email, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const getUsers = async (search) => {
    let data;
    if (search && search !== "") data = { search: search };
    else data = {};
    try {
      const res = await baseAxios.post(`/user/getuser`, data);
      if (res.data.status === 1) {
        setUsers(res.data.list.filter((each) => each.type !== "admin"));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };
  const deleteUser = async (id) => {
    try {
      const res = await baseAxios.delete(`/user/delete/${id}`);
      if (res.data.status === 1) {
        setUsers(res.data.list.filter((each) => each.type !== "admin"));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };

  const getJobs = async (search) => {
    try {
      let data;
      if (search && search !== "") data = { search: search };
      else data = {};
      const res = await baseAxios.post(`/job/search`, data);
      if (res.data.status === 1) {
        setJobs(res.data.list);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await baseAxios.delete(`/job/delete/${id}`);
      if (res.data.status === 1) {
        setJobs(res.data.list);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };
  const getIndustries = async (search) => {
    try {
      let data;
      if (search && search !== "") data = { search: search };
      else data = {};
      const res = await baseAxios.post(`/industry/get`, data);
      if (res.data.status === 1) {
        setIndustries(res.data.list);
      } else {
        setIndustries([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };
  const getCountries = async () => {
    try {
      const res = await baseAxios.get(`/auth/country`);
      if (res.data.status === 1) {
        setCountries(res.data.list);
      } else {
        setCountries([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };
  const getProvince = async (code) => {
    try {
      const data = {
        countryCode: code,
      };
      const res = await baseAxios.post(`/auth/province`, data);
      if (res.data.status === 1) {
        setProvince(res.data.list);
      } else {
        setProvince([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };

  const getApplications = async (search = "") => {
    try {
      const res = await baseAxios.get(`/application/getApplications?length=1000&search=${search}`);
      if (res.data.status === 1) {
        setApplications(res.data.list);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        getUsers,
        users,
        deleteUser,
        getJobs,
        jobs,
        deleteJob,
        industries,
        getIndustries,
        countries,
        getCountries,
        province,
        getProvince,

        applications,
        getApplications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
