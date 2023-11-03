import { API_BASE_URL, BEARER_TOKEN } from "./config";
import axios from "axios";

export async function get(path, queryParams) {
  const businesses = await axios
    .request({
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Origin: "localhost",
        // withCredentials: true,
      },
      method: "GET",
      url: `${API_BASE_URL}${path}?${queryParams}`,
    })
    .then((res) => {
      return res.data;
    });

  return businesses;
}

export async function detail(path, id) {
  const detail = await axios
    .request({
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Origin: "localhost",
        // withCredentials: true,
      },
      method: "GET",
      url: `${API_BASE_URL}${path}/${id}`,
    })
    .then((res) => {
      return res.data;
    });

  return detail;
}
