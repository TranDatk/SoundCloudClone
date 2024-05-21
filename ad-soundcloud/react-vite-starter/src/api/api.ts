/** @format */

import axios from "axios";
import cookies from "react-cookies";

export const BASE_URL = "http://127.0.0.1:8000";

export const endpoints = {
  login: "/o/token/",
  users : "/users/",
  register : "/users/register/",
  updateUser : "/users/update-user/",
  tracks : "/tracks/",
};

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${cookies.load('access_token')}`
  } 
})
