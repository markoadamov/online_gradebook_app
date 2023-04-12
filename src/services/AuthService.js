import HttpService from "./HttpsService";

class AuthService extends HttpService {
  login = async (credentials) => {
    const { data } = await this.client.post("/login", credentials);
    localStorage.setItem("token", data.token);
    return data.user;
  };
  register = async (userData) => {
    const { data } = await this.client.post("/register", userData);
    localStorage.setItem("token", data.token);
    return data.user;
  };
  logout = async (setIsAuthenticated) => {
    await this.client.post("/logout");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  getActiveUser = async () => {
    const { data } = await this.client.get("/active-user");
    if (Object.keys(data).length === 0) {
      localStorage.removeItem("token");
    }
    return data;
  };
}

const authService = new AuthService();

export default authService;