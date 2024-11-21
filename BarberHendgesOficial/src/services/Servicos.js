import { api } from "../boot/axios";

export const Servicos = {

  async getServicos() {
    try {
      const response = await api.get("/servicos");
      return response.data; 
    } catch (error) {
      console.error("Erro ao carregar serviços", error);
      throw error;  
    }
  },
  async createServico(data) {
    try {
      const payload = {
        nome_servico: data.nome_servico,
        descricao: data.descricao,
        duracao_estimada: data.duracao_estimada,
        preco: data.preco,
        situacao: data.situacao || "Ativo",
      };
      const response = await api.post("/servicos", payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar serviço", error);
      throw error;
    }
  },
  async updateServico(id, data) {
    try {
      const payload = {
        nome_servico: data.nome_servico,
        descricao: data.descricao,
        duracao_estimada: data.duracao_estimada,
        preco: data.preco,
        situacao: data.situacao || "Ativo",  
      };
      const response = await api.put(`/servicos/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar serviço", error);
      throw error; 
    }
  },
  async deleteServico(id) {
    try {
      const response = await api.delete(`/servicos/${id}`); 
      return response.data; 
    } catch (error) {
      console.error("Erro ao deletar serviço", error);
      throw error;
    }
  },
};
