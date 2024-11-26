import axios from "axios";

export const createAxiosClient = (headers = {}) => {
  return axios.create({
    baseURL: typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1` : "/api/v1",
    headers,
    withCredentials: true, // Ensure cookies are included
  });
};

export const axiosClient = createAxiosClient();
