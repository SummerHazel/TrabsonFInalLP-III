<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="col">
        <div class="row" style="margin: 10px;">
          <q-btn @click="getBarbeiros()">Carregar</q-btn>
          <q-btn to="/Home/clientes">CLIENTES</q-btn>
          <q-btn to="/Home/Home">BARBEIROS</q-btn>
          <div>
            lista
            {{ barbeiros }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useBarbeirosStore } from '../stores/barbeiros'
import { mapActions, mapState } from 'pinia'
defineOptions({
  name: 'IndexPage',
  computed: {
    ...mapState(useBarbeirosStore, ['barbeiros'])
  },
  methods: {
    ...mapActions(useBarbeirosStore, ['getBarbeiros'])
  }
});
</script>