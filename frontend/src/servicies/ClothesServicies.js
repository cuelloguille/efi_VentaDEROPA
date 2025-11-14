import axios from "axios";
import { API_URL } from "../config";

export const getClothes = async (token) => {
  const res = await axios.get(`${API_URL}/clothes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
