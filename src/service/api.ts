import axios from "axios";

const api = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place/",
});

//ADICIONE SUA CHAVE ABAIXO
export const API_KEY = "";

export default api;
