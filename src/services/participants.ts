import axios from "axios";
import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/participants`);
  return response.data;
};
