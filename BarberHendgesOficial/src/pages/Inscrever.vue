<template>
  <div class="signup-page q-pa-md flex flex-center">
    <q-card class="signup-card">
      <q-card-section class="q-pa-none text-center">
        <h2 class="text-yellow-9">Inscrever</h2>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleInscricao">
          <q-input
            v-model="nomeCompleto"
            label="Nome Completo"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="person"
          />
          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="mail"
          />
          <q-input
            v-model="endereco"
            label="Endereço"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="home"
          />
          <q-input
            v-model="numeroTelefone"
            label="Número de Telefone"
            type="tel"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="phone"
          />
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="lock"
          />
          <q-input
            v-model="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="lock"
          />
          <div class="text-center q-mt-md">
            <q-btn
              label="Inscrever-se"
              color="yellow-9"
              text-color="black"
              @click="handleInscricao"
              class="full-width"
            />
          </div>
        </q-form>

        <div class="q-mt-md text-center">
          <p>OU</p>
          <q-btn
            outline
            color="grey-8"
            class="q-mb-sm full-width"
            label="Acessar Com Google"
            icon="g_translate"
          />
          <q-btn
            outline
            color="blue-8"
            class="full-width"
            label="Acessar Com Facebook"
            icon="facebook"
          />
        </div>
      </q-card-section>
      <q-card-actions align="center" class="q-pt-none">
        <router-link to="/home" class="text-yellow-9">HomePage</router-link>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Clientes } from "../services/clientes";

export default {
  name: "SignUpPage",
  data() {
    return {
      nomeCompleto: "",
      email: "",
      endereco: "",
      numeroTelefone: "",
      senha: "",
      confirmarSenha: "",
    };
  },
  methods: {
    handleInscricao() {
      if (this.senha !== this.confirmarSenha) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          message: "As senhas não coincidem!",
          position: "top",
        });
        return;
      }
      if (
        this.nomeCompleto &&
        this.email &&
        this.endereco &&
        this.numeroTelefone &&
        this.senha
      ) {
        const clienteData = {
          nome: this.nomeCompleto,
          email: this.email,
          endereco: this.endereco,
          telefone: this.numeroTelefone,
          senha: this.senha,
          situacao: "ativo",
        };
        Clientes.createCliente(clienteData)
          .then((response) => {
            this.$q.notify({
              color: "green-5",
              textColor: "white",
              message: "Cadastro realizado com sucesso!",
              position: "top",
            });
            this.$router.push("/agendar");
          })
          .catch((error) => {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              message: "Erro ao cadastrar, tente novamente mais tarde.",
              position: "top",
            });
          });
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          message: "Por favor, preencha todos os campos.",
          position: "top",
        });
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  background-color: #0d1117;
  height: 100vh;
}

.signup-card {
  width: 350px;
  max-width: 90vw;
}

.full-width {
  width: 100%;
}
</style>
