import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:4468",
});

//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//mod
export default clienteAxios;
