import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}${"/api/all"}`);
  const response = request.then((response) => response.data);
  return response;
};

export default { getAllCountries };
