import axios from "axios";
import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/races`);
  return response.data;
};
