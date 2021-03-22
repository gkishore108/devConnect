import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register

export const register = ({
  userName,
  email,
  password,
  passwordVerify,
}) => async (dispatch) => {
  const postData = {
    userName,
    email,
    password,
    passwordVerify,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(postData);
  try {
    const res = await axios.post("/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.errorMessage, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login

export const login = ({ email, password }) => async (dispatch) => {
  const postData = {
    email,
    password,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(postData);

  try {
    const res = await axios.post("/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.errorMessage, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
