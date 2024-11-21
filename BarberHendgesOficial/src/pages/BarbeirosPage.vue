<template>
    <q-page class="q-pa-md barbeiros-page">
      <div class="menu-container">
        <div class="menu-header">
          <h2 class="text-yellow-9"><strong>Cadastro de Barbeiros</strong></h2>
        </div>
        <q-btn-group toggle color="yellow-9" class="q-mb-md">
          <q-btn label="Cadastrar Barbeiro" @click="showCadastro = true" :flat="showCadastro" />
          <q-btn label="Listar Barbeiros" @click="showCadastro = false" :flat="!showCadastro" />
        </q-btn-group>
        <div class="flex-container">
          <div v-if="showCadastro" class="form-container">
            <q-form @submit="handleSubmit">
              <q-input
                v-model="formData.nome"
                label="Nome do Barbeiro"
                required
                class="q-mb-md"
              />
              <q-input
                v-model="formData.numero_telefone"
                label="Número de Telefone"
                required
                type="tel"
                class="q-mb-md"
              />
              <q-input
                v-model="formData.horario_trabalho"
                label="Horário de Trabalho"
                required
                type="text"
                class="q-mb-md"
              />
              <q-input
                v-model="formData.taxa_comissao"
                label="Taxa de Comissão (%)"
                required
                type="number"
                min="0"
                step="0.01"
                class="q-mb-md"
              />
              <q-select
                v-model="formData.situacao"
                :options="situacaoOptions"
                label="Situação"
                required
                class="q-mb-md"
              />
              <div class="button-container">
              <q-btn label="Cadastrar Barbeiro" color="yellow-9" type="submit" class="q-mt-sm" />
              <q-btn label="Voltar" color="yellow-9" flat to="/HomeLogin" />
             </div>
            </q-form>
          </div>
          <div v-else class="barbeiros-list">
            <h3 class="text-black">Barbeiros Cadastrados</h3>
            <q-table
              :rows="barbeiros"
              :columns="columns"
              row-key="id"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    color="secondary"
                    icon="edit"
                    @click="editBarbeiro(props.row)"
                    size="sm"
                    class="q-mr-sm"
                  />
                  <q-btn
                    color="negative"
                    icon="delete"
                    @click="deleteBarbeiro(props.row.id_barbeiro)"
                    size="sm"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { Barbeiros } from "../services/barbeiros";
  
  export default {
    data() {
      return {
        showCadastro: true, 
        formData: {
          id_barbeiro: null,
          nome: "",
          numero_telefone: "",
          horario_trabalho: "",
          taxa_comissao: 0,
          situacao: "Ativo",
        },
        barbeiros: [],
        situacaoOptions: [
          { label: "Ativo", value: "Ativo" },
          { label: "Inativo", value: "Inativo" },
        ],
        columns: [
          { name: "nome", label: "Nome", align: "left", field: "nome" },
          { name: "numero_telefone", label: "Telefone", align: "left", field: "numero_telefone" },
          { name: "horario_trabalho", label: "Horário de Trabalho", align: "left", field: "horario_trabalho" },
          { name: "taxa_comissao", label: "Comissão (%)", align: "right", field: "taxa_comissao" },
          { name: "situacao", label: "Situação", align: "center", field: "situacao" },
          { name: "actions", label: "Ações", align: "center" },
        ],
      };
    },
    methods: {
      async fetchBarbeiros() {
        try {
          const response = await Barbeiros.getBarbeiros();
          this.barbeiros = response.barbeiros || [];
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao carregar barbeiros.",
            position: "top-right",
          });
        }
      },
      async handleSubmit() {
        if (this.formData.id_barbeiro) {
          await this.updateBarbeiro();
        } else {
          await this.createBarbeiro();
        }
      },
      async createBarbeiro() {
        try {
          await Barbeiros.createBarbeiro(this.formData);
          this.$q.notify({
            type: "positive",
            message: "Barbeiro cadastrado com sucesso!",
            position: "top-right",
          });
          this.clearForm();
          this.fetchBarbeiros();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao cadastrar barbeiro.",
            position: "top-right",
          });
        }
      },
      async updateBarbeiro() {
        try {
          await Barbeiros.updateBarbeiro(this.formData.id_barbeiro, this.formData);
          this.$q.notify({
            type: "positive",
            message: "Barbeiro atualizado com sucesso!",
            position: "top-right",
          });
          this.clearForm();
          this.fetchBarbeiros();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao atualizar barbeiro.",
            position: "top-right",
          });
        }
      },
      async deleteBarbeiro(id) {
        try {
          await Barbeiros.deleteBarbeiro(id);
          this.$q.notify({
            type: "positive",
            message: "Barbeiro excluído com sucesso!",
            position: "top-right",
          });
          this.fetchBarbeiros();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao excluir barbeiro.",
            position: "top-right",
          });
        }
      },
      editBarbeiro(barbeiro) {
        this.formData = { ...barbeiro };
        this.showCadastro = true;
      },
      clearForm() {
        this.formData = {
          id_barbeiro: null,
          nome: "",
          numero_telefone: "",
          horario_trabalho: "",
          taxa_comissao: 0,
          situacao: "Ativo",
        };
      },
    },
    mounted() {
      this.fetchBarbeiros();
    },
  };
  </script>
  