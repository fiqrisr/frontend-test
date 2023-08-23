import { BASE_API_URL } from "@configs";
import axios from "axios";

const httpInstance = axios.create({
  baseURL: BASE_API_URL,
});

console.log(BASE_API_URL);

export { httpInstance };
