<template>
  <div class="login-page q-pa-md flex flex-center">
    <q-card class="login-card">
      <q-card-section class="q-pa-none text-center">
        <h2 class="text-yellow-9">Acessar</h2>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin">
          <q-input
            v-model="username"
            label="Usuario"
            type="text"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="mail"
          />

          <q-input
            v-model="senha"
            label="Senha"
            placeholder="Sua senha"
            type="password"
            outlined
            dense
            class="q-mb-md"
            prepend-icon="lock"
          />

          <div class="text-center q-mt-md">
            <q-btn
              label="Acessar"
              color="yellow-9"
              text-color="black"
              class="full-width"
              @click="handleLogin"
            />
          </div>
        </q-form>

        <div class="q-mt-md text-center">
          <p>OU</p>
          <q-btn
            outline
            color="grey-8"
            class="q-mb-sm full-width"
            label="Acessar com Google"
            icon="g_translate"
          />
          <q-btn
            outline
            color="blue-8"
            class="full-width"
            label="Acessar com Facebook"
            icon="facebook"
          />
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pt-none">
        <router-link to="/inscrever" class="text-yellow-9">
          Inscrever-se
        </router-link>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { LoginService } from "../services/Login";
import { Notify } from 'quasar';

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      senha: "",
    };
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.senha) {
        Notify.create({
          type: 'negative',
          message: 'Preencha todos os campos.',
          position: 'top',
          timeout: 3000
        });
        return;
      }

      try {
        const response = await LoginService.login();
        const loginList = response.login || [];
        
        const user = loginList.find(
          (user) => user.username === this.username && user.senha === this.senha
        );

        if (user) {
          Notify.create({
            type: 'positive',
            message: 'Login realizado com sucesso!',
            position: 'top',
            timeout: 3000
          });
          this.$router.push("/HomeLogin");
        } else {
          Notify.create({
            type: 'negative',
            message: 'Usuário ou senha inválidos.',
            position: 'top',
            timeout: 3000
          });
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Ocorreu um erro ao realizar o login.',
          position: 'top',
          timeout: 3000
        });
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #0d1117;
  height: 100vh;
}

.login-card {
  width: 350px;
  max-width: 90vw;
}

.full-width {
  width: 100%;
}
</style>
