import { api } from "../boot/axios";

export const Clientes = {
  async getClientes() {
    try {
      const response = await api.get("/clientes");
      return response.data;
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      throw err;
    }
  },
  async getClienteById(id_cliente) {
    try {
      const response = await api.get(`/clientes/${id_cliente}`);
      return response.data;
    } catch (err) {
      console.error("Erro ao buscar cliente pelo ID:", err);
      throw err;
    }
  },
  async createCliente(data) {
    try {
      const response = await api.post("/clientes", data); 
      return response.data; 
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
      throw err;
    }
  },
  async updateCliente(id_cliente, data) {
    try {
      const response = await api.put(`/clientes/${id_cliente}`, data); 
      return response.data; 
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
      throw err;
    }
  },
  async deleteCliente(id_cliente) {
    try {
      const response = await api.delete(`/clientes/${id_cliente}`); 
      return response.data; 
    } catch (err) {
      console.error("Erro ao deletar cliente:", err);
      throw err;
    }
  },
};
