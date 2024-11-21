<template>
    <q-page class="q-pa-md">
      <div class="q-mb-md">
        <h2 class="text-yellow-9 text-center"><strong>Cadastro de Serviços</strong></h2>
      </div>
      <q-btn-group toggle color="yellow-9" class="q-mb-md">
        <q-btn label="Cadastrar Serviço" @click="showCadastro = true" :flat="showCadastro" />
        <q-btn label="Listar Serviços" @click="showCadastro = false" :flat="!showCadastro" />
      </q-btn-group>
      <div v-if="showCadastro" class="q-pa-md" style="background-color: rgba(255, 255, 255, 0.9); border-radius: 8px;">
        <q-form @submit.prevent="handleSubmit">
          <q-input v-model="formData.nome_servico" label="Nome do Serviço" required class="q-mb-md" />
          <q-input v-model="formData.descricao" label="Descrição" required class="q-mb-md" />
          <q-input v-model="formData.duracao_estimada" label="Duração Estimada (minutos)" type="text" min="1"/>
          <q-input v-model="formData.preco" label="Preço" type="number" step="0.01" min="0" required class="q-mb-md" />
          <div class="button-container">
          <q-btn label="Salvar Serviço" color="yellow-9" type="submit" />
          <q-btn label="Voltar" color="yellow-9" flat to="/HomeLogin" />
        </div>
        </q-form>
      </div>
      <div v-else class="q-pa-md" style="background-color: rgba(255, 255, 255, 0.9); border-radius: 8px;">
        <h3 class="text-center">Serviços Cadastrados</h3>
        <q-table
          :rows="servicos"
          :columns="columns"
          row-key="id_servico"
          :rows-per-page-options="[5, 10, 20]"
          :pagination="pagination"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                color="secondary"
                icon="edit"
                @click="editServico(props.row)"
                size="sm"
                class="q-mr-sm"
              />
              <q-btn
                color="negative"
                icon="delete"
                @click="deleteServico(props.row.id_servico)"
                size="sm"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page>
  </template>
  
  <script>
  import { Servicos } from "../services/Servicos";
  
  export default {
    data() {
      return {
        showCadastro: true,
        formData: {
          id_servico: null,
          nome_servico: "",
          descricao: "",
          duracao_estimada: null,
          preco: 0,
          situacao: "Ativo",
        },
        servicos: [],
        pagination: {
          page: 1,
          rowsPerPage: 10,
        },
        columns: [
          { name: "nome_servico", label: "Nome", align: "left", field: "nome_servico" },
          { name: "descricao", label: "Descrição", align: "left", field: "descricao" },
          { name: "duracao_estimada", label: "Duração", align: "right", field: "duracao_estimada" },
          { name: "preco", label: "Preço", align: "right", field: "preco" },
          { name: "situacao", label: "Situação", align: "center", field: "situacao" },
          { name: "actions", label: "Ações", align: "center" },
        ],
      };
    },
    methods: {
      async fetchServicos() {
        try {
          const response = await Servicos.getServicos();
          this.servicos = response.servicos || [];
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao carregar os serviços.",
            position: "top-right",
          });
        }
      },
      async handleSubmit() {
        if (this.formData.id_servico) {
          await this.updateServico();
        } else {
          await this.createServico();
        }
      },
      async createServico() {
        try {
            console.log(this.formData)
          await Servicos.createServico(this.formData);
          this.$q.notify({
            type: "positive",
            message: "Serviço cadastrado com sucesso!",
            position: "top-right",
          });
          this.clearForm();
          this.fetchServicos();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao cadastrar serviço.",
            position: "top-right",
          });
        }
      },
      async updateServico() {
        try {
          await Servicos.updateServico(this.formData.id_servico, this.formData);
          this.$q.notify({
            type: "positive",
            message: "Serviço atualizado com sucesso!",
            position: "top-right",
          });
          this.clearForm();
          this.fetchServicos();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao atualizar serviço.",
            position: "top-right",
          });
        }
      },
      async deleteServico(id_servico) {
        try {
          await Servicos.deleteServico(id_servico);
          this.$q.notify({
            type: "positive",
            message: "Serviço excluído com sucesso!",
            position: "top-right",
          });
          this.fetchServicos();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao excluir serviço.",
            position: "top-right",
          });
        }
      },
      editServico(servico) {
        this.formData = { ...servico };
        this.showCadastro = true;
      },
      clearForm() {
        this.formData = {
          id_servico: null,
          nome_servico: "",
          descricao: "",
          duracao_estimada: null,
          preco: 0,
          situacao: "Ativo",
        };
      },
    },
    mounted() {
      this.fetchServicos();
    },
  };
  </script>
