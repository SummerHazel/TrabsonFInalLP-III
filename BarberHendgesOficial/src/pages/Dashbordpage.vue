<template>
  <q-page class="full-height">
    <q-card class="col-12 q-pa-md">
      <q-card-section>
        <div class="text-h6">Gráfico de Status dos Agendamentos</div>
        <Bar
          v-if="statusAgendamentos"
          :data="{
            labels: Object.keys(statusAgendamentos),
            datasets: [{
              label: 'Status de Agendamentos',
              data: Object.values(statusAgendamentos),
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
              borderWidth: 1
            }]
          }"
          :options="{
            responsive: true,
            scales: {
              x: { title: { display: true, text: 'Status' } },
              y: { 
                title: { display: true, text: 'Quantidade' }, 
                beginAtZero: true,
                ticks: { stepSize: 1 }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.raw + ' agendamentos';
                  }
                }
              }
            }
          }"
          style="height: 200px; width: 100%;"
        />
      </q-card-section>
    </q-card>
    <q-card class="col-12 q-pa-md">
      <q-card-section>
        <div class="text-h6">Faturamento Diário</div>

        <Bar
          v-if="faturamentoDiario"
          :data="{
            labels: Object.keys(faturamentoDiario),
            datasets: [{
              label: 'Faturamento',
              data: Object.values(faturamentoDiario),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          }"
          :options="{
            responsive: true,
            scales: {
              x: { 
                title: { display: true, text: 'Data' },
                ticks: {
                  maxRotation: 45,
                  autoSkip: true
                }
              },
              y: { 
                title: { display: true, text: 'Valor Total (R$)' }, 
                beginAtZero: true
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    const valor = Number(tooltipItem.raw);
                    return 'R$ ' + (isNaN(valor) ? tooltipItem.raw : valor.toFixed(2));
                  }
                }
              }
            }
          }"
          style="height: 300px; width: 100%;"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Agendamentos } from '../services/agendamentos';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'DashboardPage',
  components: {
    'Bar': Bar
  },
  data() {
    return {
      statusAgendamentos: null,
      faturamentoDiario: null,
    };
  },
  methods: {
    async fetchAgendamentos() {
      try {
        const response = await Agendamentos.getAgendamentos();
        const agendamentos = response.agendamentos;

        if (Array.isArray(agendamentos)) {
          this.processarStatusAgendamentos(agendamentos);
          this.processarFaturamentoDiario(agendamentos);
        } else {
          console.error('Erro: A resposta de agendamentos não contém um array ou é inválida:', agendamentos);
        }
      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
      }
    },

    processarStatusAgendamentos(agendamentos) {
      try {
        const statusAgendamentos = agendamentos.reduce((acc, agendamento) => {
          const status = agendamento.status_agendamento;
          if (!acc[status]) {
            acc[status] = 1;
          } else {
            acc[status] += 1;
          }
          return acc;
        }, {});
        this.statusAgendamentos = statusAgendamentos;
        console.log("Status dos agendamentos:", statusAgendamentos);
      } catch (error) {
        console.error("Erro ao processar status dos agendamentos:", error);
      }
    },

    processarFaturamentoDiario(agendamentos) {
      try {
        const faturamentoDiario = agendamentos.reduce((acc, agendamento) => {
          const valor = parseFloat(agendamento.valor_total);
          if (isNaN(valor)) {
            return acc;
          }
          const data = new Date(agendamento.data_agendamento);
          const dataFormatada = data.toLocaleDateString('en-CA'); 
          if (!acc[dataFormatada]) {
            acc[dataFormatada] = valor;
          } else {
            acc[dataFormatada] += valor;
          }
          return acc;
        }, {});

        this.faturamentoDiario = faturamentoDiario;
        console.log("Faturamento diário:", faturamentoDiario);
      } catch (error) {
        console.error("Erro ao processar faturamento diário:", error);
      }
    },
  },
  mounted() {
    this.fetchAgendamentos();
  }
};
</script>

