/** @format */

import cookies from "react-cookies";
import { client_id, client_secret } from "../constants/user.constants";
import { endpoints } from "./api";
import { IUser } from "../components/users/user.table";
import API from './api';


export const login = async (username: string, password: string) => {
  const bodyObject = new URLSearchParams();
  bodyObject.append('username', username || '');
  bodyObject.append('password', password || '');
  bodyObject.append('client_id', client_id || '');
  bodyObject.append('client_secret', client_secret || '');
  bodyObject.append('grant_type', 'password');

const response = await fetch('http://127.0.0.1:8000/o/token/',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: bodyObject.toString(),
})
  const data = await response.json();
  cookies.save("access_token", data.access_token, { path: "/" });
};


export const getListUsers = async (currentPage : number) => {
  try {
    const userList = await API.get(`${endpoints["users"]}?page=${currentPage}`);
    return userList;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy danh sách người dùng:", error);
    throw error; 
  }
};

export const registerUser = async (user: IUser) => {
  const formDataObject = new FormData();
    for (const key in user) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        const typedKey: keyof IUser = key as keyof IUser;
        formDataObject.append(typedKey, user[typedKey]);
      }
    }

  const res = await fetch('http://127.0.0.1:8000/users/register/', {
    headers: {
      'Authorization': `Bearer ${cookies.load('access_token')}`,
    },
    method: 'POST',
    body: formDataObject
  });

  if (!res.ok) {
    const responseData = await res.json();
    const errorMessage = responseData.message ? responseData.message : 'Có lỗi xảy ra khi đăng ký người dùng.';
    throw new Error('Có lỗi xảy ra: ' + errorMessage);
  }
  return await res.json(); 
};

export const updateUser = async (user: IUser) => {
  try {
    const res = await API.patch(endpoints["updateUser"], {
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_superuser: user.is_superuser
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return res; 

  } catch (error) {
    console.error("Đã xảy ra lỗi khi sửa thông tin người dùng:", error);
    throw error;
  }
};

export const hideUser = async (id: number) => {
  try {
    const res = await API.post(endpoints["users"] + `${id}/hide-user/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res; 

  } catch (error) {
    console.error("Đã xảy ra lỗi khi ẩn người dùng:", error);
    throw error;
  }
};