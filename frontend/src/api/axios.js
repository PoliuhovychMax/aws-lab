import axios from "axios";
import { API_URL } from '../api';

export default axios.create({
  baseURL: `${API_URL}`,
});