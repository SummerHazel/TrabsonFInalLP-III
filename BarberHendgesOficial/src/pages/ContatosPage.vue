<template>
    <div class="contato-page">
      <div class="center-container">
        <div class="contact-grid">
          <div v-for="barbeiro in barbeiros" :key="barbeiro.id_barbeiro" class="contact-card">
            <q-card class="my-card text-black" style="width: 100%;">
              <q-card-section>
                <div class="text-h6">{{ barbeiro.nome }}</div>
                <div class="text-subtitle2">{{ barbeiro.numero_telefone }}</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="text-h6">Horário: {{ barbeiro.horario_trabalho }}</div>
              </q-card-section>
              <q-card-actions>
                <q-btn label="Entrar em Contato" color="yellow-9" @click="contactBarbeiro(barbeiro)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Barbeiros } from '../services/barbeiros';
  
  export default defineComponent({
    name: 'ContatoPage',
    data() {
      return {
        barbeiros: [],  
      };
    },
    async mounted() {
      try {
        const response = await Barbeiros.getBarbeiros();  
        this.barbeiros = response.barbeiros;  
      } catch (error) {
        console.error('Erro ao carregar os barbeiros:', error);
      }
    },
    methods: {
      contactBarbeiro(barbeiro) {
        this.$router.push('/agendar');

      }
    },
  });
  </script>
  
  <style scoped>
  .contato-page {
    background-image: url('../assets/SobrePage.jpg');
    background-size: cover;
    height: 100vh;
    color: #000000;
  }
  
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 110vh;
  }
  </style>
  