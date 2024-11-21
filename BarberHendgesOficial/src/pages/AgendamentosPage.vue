<template>
  <q-page class="q-pa-md sobre-page">
    <div class="menu-container">
      <div class="menu-header">
        <h2 class="text-yellow-9"><strong> AGENDAMENTOS </strong></h2>
      </div>
      <q-form @submit="handleSubmit" class="form-container">
        <q-input
          v-model="formData.email"
          label="Email do Cliente"
          type="email"
          required
          @blur="validateAndFetchClientId"
          @input="validateAndFetchClientId" 
          class="q-mb-md"
        />
        <q-select
          v-model="formData.id_barbeiro"
          label="Selecione o Barbeiro"
          :options="barbeiros"
          option-value="id_barbeiro"
          option-label="nome"
          required
          emit-value
          map-options
          class="q-mb-md"
        />
        <q-select
          v-model="formData.id_servico"
          label="Selecione o Serviço"
          :options="servicos"
          option-value="id_servico"
          option-label="nome_servico"
          required
          emit-value
          map-options
          @update:model-value="onServicoSelect"
          class="q-mb-md"
        />
        <q-input
          v-model="formData.valor_total"
          label="Valor Total"
          readonly
          class="q-mb-md"
        />
        <q-select
          v-model="formData.id_pagamento"
          label="Forma de Pagamento"
          :options="formasPagamento"
          option-value="id_pagamento"
          option-label="nome_pagamento"
          required
          emit-value
          map-options
          class="q-mb-md"
        />
        <q-input
          v-model="formData.data_agendamento"
          label="Data e Hora"
          type="datetime-local"
          :disabled="!isClienteValido"
          :required="isClienteValido"
          @blur="validateClienteOnDateChange"
          v-if="isClienteValido" 
          class="q-mb-md"
        />
        <div v-if="!isClienteValido" class="q-mb-md text-negative">
          <q-btn to="/inscrever" label="Cadastre-se para realizar o agendamento" color="yellow-9" />
        </div>

        <q-btn label="Agendar" color="yellow-9" type="submit" :disable="!isClienteValido || !formData.data_agendamento" class="q-mt-sm" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { Agendamentos } from "../services/agendamentos";

export default {
  data() {
    return {
      formData: {
        email: "",
        id_cliente: null,
        id_barbeiro: null,
        id_servico: null,
        valor_total: 0,
        id_pagamento: null,
        data_agendamento: null,
        status_agendamento: "Pendente",
      },
      barbeiros: [],
      servicos: [],
      formasPagamento: [],
      isValidating: false,
      isClienteValido: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        const barbeirosResponse = await Agendamentos.getBarbeiros();
        const servicosResponse = await Agendamentos.getServicos();
        const formasPagamentoResponse = await Agendamentos.getFormasPagamento();
        this.barbeiros = barbeirosResponse.barbeiros || [];
        this.servicos = servicosResponse.servicos || [];
        this.formasPagamento = formasPagamentoResponse.formas_pagamento || [];
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Erro ao carregar dados.",
          position: "top-right",
        });
      }
    },
    async validateAndFetchClientId() {
      if (this.isValidating) return;
      this.isValidating = true;
      try {
        if (!this.formData.email) {
          this.$q.notify({
            type: "warning",
            message: "Por favor, insira um email.",
            position: "top-right",
          });
          return;
        }
        const response = await Agendamentos.getClienteByEmail(this.formData.email);
        if (response?.cliente?.id_cliente) {
          this.formData.id_cliente = response.cliente.id_cliente;
          this.isClienteValido = true; 
          this.$q.notify({
            type: "positive",
            message: "Cliente validado!",
            position: "top-right",
          });
        } else {
          this.resetForm();
          this.$q.notify({
            type: "warning",
            message: "Cliente não encontrado. Cadastre-se.",
            position: "top-right",
          });
        }
      } catch (error) {
        this.resetForm();
        this.$q.notify({
          type: "negative",
          message: "Erro ao carregar o cliente. Tente novamente.",
          position: "top-right",
        });
      } finally {
        this.isValidating = false;
      }
    },
    validateClienteOnDateChange() {
      if (this.formData.data_agendamento && !this.isClienteValido) {
        this.$q.notify({
          type: "negative",
          message: "Para agendar, é necessário que o cliente seja válido.",
          position: "top-right",
        });
        this.formData.data_agendamento = null;
      }
    },
    onServicoSelect(idServico) {
      const servicoSelecionado = this.servicos.find(
        (servico) => servico.id_servico === idServico
      );
      this.formData.valor_total = servicoSelecionado ? parseFloat(servicoSelecionado.preco || 0) : 0;
    },
    async handleSubmit() {
      try {
        const { email, ...payload } = this.formData;
        payload.id_cliente = this.formData.id_cliente;
        await Agendamentos.createAgendamento(payload);
        this.$q.notify({
          type: "positive",
          message: "Agendamento realizado!",
          position: "top-right",
        });
        this.clearForm();
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Erro ao realizar agendamento.",
          position: "top-right",
        });
      }
    },
    resetForm() {
      this.formData = {
        email: "",
        id_cliente: null,
        id_barbeiro: null,
        id_servico: null,
        valor_total: 0,
        id_pagamento: null,
        data_agendamento: null,
        status_agendamento: "Pendente",
      };
      this.isClienteValido = false;  
    },
    clearForm() {
      this.formData = {
        email: "",
        id_cliente: null,
        id_barbeiro: null,
        id_servico: null,
        valor_total: 0,
        id_pagamento: null,
        data_agendamento: null,
        status_agendamento: "Pendente",
      };
      this.isClienteValido = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.sobre-page {
  background-image: url('../assets/SobrePage.jpg');
  background-size: cover;
  height: 100vh;
  color: #000000;
}

.menu-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.menu-header h2 {
  font-size: 2rem;
  color: #000;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 8px;
}

.q-input,
.q-select {
  max-width: 100%;
  margin-bottom: 15px;
}

.q-btn {
  width: 100%;
  padding: 10px;
}

.text-negative {
  color: #e60000;
}
</style>
