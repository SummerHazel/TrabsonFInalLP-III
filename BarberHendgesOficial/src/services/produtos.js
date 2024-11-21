import { api } from "../boot/axios";

export const Produtos = {
  async getProdutos() {
    try {
      const response = await api.get("/produtos");
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
      throw error;
    }
  },

  async createProduto(data) {
    try {
      const response = await api.post("/produtos", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto", error);
      throw error;
    }
  },

  async updateProduto(id, data) {
    try {
      const response = await api.put(`/produtos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar produto", error);
      throw error;
    }
  },

  async deleteProduto(id) {
    try {
      const response = await api.delete(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar produto", error);
      throw error;
    }
  },
};
