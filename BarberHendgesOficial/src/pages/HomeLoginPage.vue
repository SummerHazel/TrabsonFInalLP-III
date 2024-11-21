<template>
    <div class="sobre-page">
      <q-page class="flex flex-center">
        <div class="text-center menu-container">
          <q-btn
            label="Cadastro Serviço"
            color="yellow-9"
            class="q-mb-md"
            to="/CadastroServico"
          />
          <q-btn
            label="Cadastro Barbeiro"
            color="yellow-9"
            class="q-mb-md"
            to="/CadastroBarbeiro"
          />
          <q-btn
            label="Cadastro Produto"
            color="yellow-9"
            class="q-mb-md"
            to="/CadastroProduto"
          />
          <q-btn
            label="Consulta Agendamento"
            color="yellow-9"
            to="/ConsultaAgendamento"
          />
          <q-btn
            label="DashBord"
            color="yellow-9"
            to="/DashPage">
          </q-btn>
        </div>
      </q-page>
    </div>
  </template>
  
  <script>
  export default {
    name: "SobrePage",
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px; 
  }
  
  .q-btn {
    width: 250px; 
  }
  </style>
  