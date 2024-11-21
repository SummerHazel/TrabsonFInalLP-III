import { api } from "../boot/axios";

export const Agendamentos = {
  async getAgendamentos() {
    try {
      const agendamentos = await api.get(`/agendamentos/`);
      return agendamentos.data;
    } catch (err) {
      throw err;
    }
  },
  async createAgendamento(data) {
    try {
      const response = await api.post('/agendamentos', data);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  async getBarbeiros() {
    try {
      const response = await api.get('/barbeiros');
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  async getFormasPagamento() {
    try {
      const response = await api.get('/formas_pagamento');
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  async getServicos() {
    try {
      const response = await api.get('/servicos');
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  async getClienteByEmail(email) {
    try {
      const response = await api.get(`/clientes/email/${email}`);
      return response.data;
    } catch (err) {
      console.error("Erro ao buscar cliente por e-mail:", err);
      throw err;
    }
  },
  async updateAgendamento(id, status) {
    try {

      const response = await api.patch(`/agendamentos/${id}`, {
        status_agendamento: status,
      });
      return response.data;
    } catch (err) {
      console.error("Erro ao atualizar o agendamento:", err);
      throw err;
    }
  },
  async deleteAgendamento(id) {
    try {
      const response = await api.delete(`/agendamentos/${id}`);
      return response.data;
    } catch (err) {
      console.error("Erro ao excluir o agendamento:", err);
      throw err;
    }
  },
};
