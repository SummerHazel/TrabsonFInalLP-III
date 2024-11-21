<template>
    <q-page class="q-pa-md produtos-page">
      <div class="menu-container">
        <div class="menu-header">
          <h2 class="text-yellow-9"><strong>Cadastro de Produtos</strong></h2>
        </div>
        <q-btn-group toggle color="yellow-9" class="q-mb-md">
          <q-btn label="Cadastrar Produto" @click="showCadastro = true" :flat="showCadastro" />
          <q-btn label="Listar Produtos" @click="showCadastro = false" :flat="!showCadastro" />
        </q-btn-group>
        <div class="flex-container">
          <div v-if="showCadastro" class="form-container">
            <q-form @submit="handleSubmit">
              <q-input
                v-model="formData.nome_produto"
                label="Nome do Produto"
                required
                class="q-mb-md"
              />
              <q-input
                v-model="formData.descricao"
                label="Descrição"
                required
                class="q-mb-md"
              />
              <q-input
                    v-model="formData.preco_unitario"
                    label="Preço"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    class="q-mb-md"
                    />
              <q-input
                v-model="formData.quantidade_estoque"
                label="Quantidade em Estoque"
                type="number"
                min="0"
                required
                class="q-mb-md"
              />
              <div class="button-container">
          <q-btn label="Cadastrar Produto" color="yellow-9" type="submit" class="q-mt-sm" />
          <q-btn label="Voltar" color="yellow-9" flat to="/HomeLogin" />
        </div>
            </q-form>
          </div>
          <div v-else class="produtos-list">
            <h3 class="text-black">Produtos Cadastrados</h3>
            <q-table
              :rows="produtos"
              :columns="columns"
              row-key="id_produto"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    color="secondary"
                    icon="edit"
                    @click="editProduct(props.row)"
                    size="sm"
                    class="q-mr-sm"
                  />
                  <q-btn
                    color="negative"
                    icon="delete"
                    @click="deleteProduct(props.row.id_produto)"
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
  import { Produtos } from "../services/produtos";
  
  export default {
    data() {
      return {
        showCadastro: true,
        formData: {
          id_produto: null,
          nome_produto: "",
          descricao: "",
          preco_unitario: 0,
          quantidade_estoque: 0,
          situacao: "Ativo"
        },
        produtos: [],
        columns: [
          { name: "nome_produto", label: "Nome", align: "left", field: "nome_produto" },
          { name: "descricao", label: "Descrição", align: "left", field: "descricao" },
          { name: "preco_unitario", label: "Preço", align: "right", field: "preco_unitario" },
          { name: "quantidade_estoque", label: "Quantidade", align: "right", field: "quantidade_estoque" },
          { name: "actions", label: "Ações", align: "center" }
        ]
      };
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await Produtos.getProdutos();
          this.produtos = response.produtos || [];
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao carregar os produtos.",
            position: "top-right"
          });
        }
      },
      async handleSubmit() {
        if (this.formData.id_produto) {
          await this.updateProduct();
        } else {
          await this.createProduct();
        }
      },
      async createProduct() {
        try {
          
          await Produtos.createProduto(this.formData);
          this.$q.notify({
            type: "positive",
            message: "Produto cadastrado com sucesso!",
            position: "top-right"
          });
          this.clearForm();
          this.fetchProducts();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao cadastrar produto.",
            position: "top-right"
          });
        }
      },
      async updateProduct() {
        try {
          await Produtos.updateProduto(this.formData);
          this.$q.notify({
            type: "positive",
            message: "Produto atualizado com sucesso!",
            position: "top-right"
          });
          this.clearForm();
          this.fetchProducts();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao atualizar produto.",
            position: "top-right"
          });
        }
      },
      async deleteProduct(id_produto) {
        try {
          await Produtos.deleteProduto(id_produto);
          this.$q.notify({
            type: "positive",
            message: "Produto excluído com sucesso!",
            position: "top-right"
          });
          this.fetchProducts();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Erro ao excluir produto.",
            position: "top-right"
          });
        }
      },
      editProduct(product) {
        this.formData = { ...product };
        this.showCadastro = true;
      },
      clearForm() {
        this.formData = {
          id_produto: null,
          nome_produto: "",
          descricao: "",
          preco_unitario: 0,
          quantidade_estoque: 0,
          situacao: "Ativo"
        };
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
