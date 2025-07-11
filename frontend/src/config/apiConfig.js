import axios from "axios";
import { supabase } from "../lib/supabaseClient";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
