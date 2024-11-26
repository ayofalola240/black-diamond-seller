import axios from "axios";
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const createAxiosClient = (headers = {}) => {
  return axios.create({
    baseURL: typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1` : "/api/v1",
    headers,
    withCredentials: true,
    httpsAgent: agent,
  });
};

export const axiosClient = createAxiosClient();
