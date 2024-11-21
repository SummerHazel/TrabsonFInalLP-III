<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat label="HendgesBarber" to="/home" class="q-ml-md text-yellow-9" /> 
        </q-toolbar-title>

        <q-btn flat label="Sobre" to="/sobre" class="q-ml-md text-yellow-9"/>
        <q-btn flat label="Serviços" to="/servicos" class="q-ml-md text-yellow-9" />
        <q-btn flat label="Contatos" to="/contatos" class="q-ml-md text-yellow-9" />
        <q-btn flat label="Produtos" to="/produtos" class="q-ml-md text-yellow-9" />

        <q-space />

        <q-btn flat label="Login" to="/login" class="q-ml-md text-yellow-9" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
})
</script>

<style scoped>

.q-header {
  background-color: rgb(0, 0, 0); 
}
</style>
