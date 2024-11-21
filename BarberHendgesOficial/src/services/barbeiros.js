import { api } from "../boot/axios";

export const Barbeiros = {
  async getBarbeiros() {
    try {
      const response = await api.get("/barbeiros");
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar barbeiros", error);
      throw error;
    }
  },

  async createBarbeiro(data) {
    try {
      const response = await api.post("/barbeiros", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar barbeiro", error);
      throw error;
    }
  },

  async updateBarbeiro(id, data) {
    try {
      const response = await api.put(`/barbeiros/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar barbeiro", error);
      throw error;
    }
  },

  async deleteBarbeiro(id) {
    try {
      const response = await api.delete(`/barbeiros/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar barbeiro", error);
      throw error;
    }
  },
};
