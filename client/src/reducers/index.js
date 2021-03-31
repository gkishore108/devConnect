import { combineReducers } from "redux";
import alert from "../reducers/alert";
import auth from "../reducers/auth";
import post from "../reducers/post";

export default combineReducers({
  alert,
  auth,
  post,
});
