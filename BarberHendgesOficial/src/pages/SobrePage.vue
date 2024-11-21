<template>
  <div class="sobre-page">

    <q-page class="flex flex-center">
      <div class="text-center">
        <h1 class="text-white"><strong>SOBRE NÓS</strong> </h1>
        <p class="text-white">Na HendgesBarber, localizada no coração de Saudades - SC, você encontra mais do que um
          simples corte de cabelo; encontra uma experiência. Nosso espaço no Centro da cidade é o lugar ideal para quem
          busca um atendimento de qualidade com um toque de estilo e personalidade.
          Nossa equipe de profissionais experientes está pronta para oferecer cortes precisos, barbas bem-cuidadas e um
          ambiente acolhedor onde você pode relaxar e se sentir especial. Na HendgesBarber, combinamos tradição e
          inovação para realçar o seu visual com um toque moderno.
          Venha nos visitar e descubra o compromisso da HendgesBarber com a excelência. Agende seu horário e experimente
          o verdadeiro significado de um atendimento de primeira.</p>
        <p class="text-white">HendgesBarber — Onde cada corte é uma obra de arte.</p>
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
  background-image: url('../assets/HomePage.jpg');
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