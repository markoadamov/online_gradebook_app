import HttpService from "./HttpsService";
import { useDispatch } from "react-redux";

class AuthService extends HttpService {
      async login(credentials) {
        const { data } = await this.client.post("/login", credentials);
        console.log("Login Data:", data);
        localStorage.setItem("token", data.token);
      }
      async register(userData) {
        const { data } = await this.client.post("/register", userData);
        localStorage.setItem("token", data.token);
      }
      async logout() {
        await this.client.post("/logout");
        localStorage.removeItem("token");
      }
}

const authService = new AuthService();

export default authService;