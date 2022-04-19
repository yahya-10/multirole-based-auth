import axios from "axios";

const BASE_URL = "http://localhost:7500";

const register = async (firstName, lastName, email, password, role) => {
  try {
    await axios.post(`${BASE_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
      role,
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("auth.service.js", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
