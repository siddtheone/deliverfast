import axios from "axios";
import { API_URL, COOKIE_NAME } from "config/constants";
import { getCookie } from "./utils";

export const http = axios.create({
  baseURL: API_URL,
});

export const httpAuth = () => {
  const token = getCookie(COOKIE_NAME);
  return axios.create({
    baseURL: API_URL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
