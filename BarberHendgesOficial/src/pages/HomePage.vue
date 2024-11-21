<template>
  <div class="sobre-page">

    <q-page class="flex flex-center">
      <div class="text-center">
        <h1 class="text-white"><strong> ESTILO É UM REFLEXO </strong></h1>
        <h1 class="text-white"><strong> DA SUA ATITUDE </strong></h1>
        <h1 class="text-white"><strong> E SUA PERSONALIDADE</strong></h1>
        <p class="text-white"><strong>Horário de funcionamento: 09:00 às 18:00</strong></p>
        <q-btn label="Agendar horário" color="yellow-9" class="q-mt-md" to="/agendar" />
      </div>
    </q-page>

    <q-page-container>
      <router-view />
    </q-page-container>
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

h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1.2rem;
}
</style>
