import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const registerClient = (username, password, name, surname, age) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
    name,
    surname,
    age
  });
};

const registerDoctor = (username, password, name, surname, type_id) => {
  return axios.post(API_URL + "doctor/signup", {
    username,
    password,
    name,
    surname,
    type_id
  });
};

const login = (username, password,type) => {
  const url=type.trim()==="user"? "signin": "doctor/signin";
  console.log(url)
  return axios
    .post(API_URL + url, {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  registerClient,
  registerDoctor,
  login,
  logout,
  getCurrentUser,
};