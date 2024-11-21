import { defineStore } from 'pinia';
import { LoginService } from 'src/services/Login';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  }),

  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = null;

      try {
        const response = await LoginService.login(username, password);

        if (response.success) {
          this.user = response.data;
          this.isAuthenticated = true;
          this.error = null;
        } else {
          this.error = 'Usuário ou senha incorretos';
        }
      } catch (error) {
        this.error = 'Erro ao tentar fazer login';
        console.error("Erro no login:", error);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
