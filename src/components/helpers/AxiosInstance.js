import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://mg2t3exji0.execute-api.us-east-1.amazonaws.com/sandbox",
});

export default AxiosInstance;