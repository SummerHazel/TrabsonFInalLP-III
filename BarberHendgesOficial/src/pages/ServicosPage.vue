<template>
    <div class="servicos-page">
      <div class="center-container">
        <div class="service-grid">
          <div v-for="service in services" :key="service.id_servico" class="service-card">
            <q-card class="my-card text-black" style="width: 100%;">
              <q-img :src="service.imagem" alt="Service Image" style="height: 200px;" />
              <q-card-section>
                <div class="text-h6">{{ service.nome_servico }}</div>
                <div class="text-subtitle2">{{ service.descricao }}</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="text-h6">{{ formatCurrency(service.preco) }}</div>
              </q-card-section>
              <q-card-actions>
                <q-btn label="Contratar Serviço" color="yellow-9" @click="hireService(service)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Servicos } from '../services/Servicos';
  
  export default defineComponent({
    name: 'ServicosPage',
    data() {
      return {
        services: [],
      };
    },
    async mounted() {
      try {
        const response = await Servicos.getServicos();
        this.services = response.servicos;
      } catch (error) {
        console.error("Erro ao carregar os serviços", error);
      }
    },
    methods: {
      hireService(service) {
        this.$router.push('/agendar');
      },
      formatCurrency(value) {
        const formattedValue = parseFloat(value).toFixed(2);
        return `R$ ${formattedValue.replace('.', ',')}`;
      }
    },
  });
  </script>
  
  <style scoped>
  .servicos-page {
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
  
  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 110vh;
  }
  </style>
  