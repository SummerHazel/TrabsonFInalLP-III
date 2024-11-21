import { defineStore } from 'pinia';
import barbeiros from 'src/services/barbeiros';

export const useBarbeirosStore = defineStore('barbeiros', {
  state: () => ({
    counter: 0,
    barbeiros:[]
  }),
  getters: {},
  actions: {
    increment() {
      this.counter++;
    },
    async getBarbeiros () {
        this.barbeiros = await barbeiros.getBarbeiros()
            }
  },
});