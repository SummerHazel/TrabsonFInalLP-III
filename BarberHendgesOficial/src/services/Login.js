import { api } from "../boot/axios"; 

export const LoginService = {
  async login() {
    try {
      const response = await api.get("/login"); 
      return response.data; 
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      throw error; 
    }
  },
};
