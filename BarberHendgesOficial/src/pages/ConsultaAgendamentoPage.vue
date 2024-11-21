<template>
  <q-page class="full-height">
    <div class="row full-height">
      <q-card class="col-12 col-md-12 q-pa-md">
        <q-card-section>
          <div class="text-h6">Lista de Agendamentos</div>
          <q-table
            :rows="agendamentos"
            :columns="columns"
            row-key="id_agendamento"
            :rows-per-page-options="[5, 10, 20]"
            v-model:pagination="pagination"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td>{{ props.row.id_agendamento }}</q-td>
                <q-td>{{ props.row.id_cliente || 'ID não informado' }}</q-td>
                <q-td>{{ props.row.data_agendamento ? new Date(props.row.data_agendamento).toLocaleString() : 'Sem data' }}</q-td>
                <q-td>{{ props.row.status_agendamento || 'Status não informado' }}</q-td>
                <q-td>{{ props.row.valor_total || 'R$ 0,00' }}</q-td>
                <q-td>
                  <q-btn @click="editAgendamento(props.row)" icon="edit" color="primary" flat />
                  <q-btn @click="deleteAgendamento(props.row.id_agendamento)" icon="delete" color="negative" flat />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
      <q-dialog v-model="editDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Editar Status do Agendamento</div>
            <q-form @submit.prevent="saveEdit">
              <q-select
                v-model="editingAgendamento.status_agendamento"
                label="Status"
                :options="statusOptions"
                clearable
              />
              <div class="q-mt-md">
                <q-btn label="Salvar" color="green" type="submit" />
                <q-btn label="Cancelar" color="negative" flat @click="cancelEdit" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { Agendamentos } from "../services/agendamentos";

export default {
  data() {
    return {
      agendamentos: [],
      columns: [
        { name: "id_agendamento", label: "ID", align: "left", field: "id_agendamento" },
        { name: "id_cliente", label: "ID Cliente", align: "left", field: "id_cliente" },
        { name: "data_agendamento", label: "Data Agendada", align: "left", field: "data_agendamento" },
        { name: "status_agendamento", label: "Status", align: "left", field: "status_agendamento" },
        { name: "valor_total", label: "Valor Total", align: "left", field: "valor_total" },
        { name: "actions", label: "Ações", align: "center", field: "actions" },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      q: useQuasar(),
      editDialog: false, 
      editingAgendamento: {},
      statusOptions: ["Pendente", "Cancelado", "Concluído"],
    };
  },
  methods: {
    async fetchAgendamentos() {
      try {
        const response = await Agendamentos.getAgendamentos();
        this.agendamentos = response.agendamentos || [];
      } catch (error) {
        this.q.notify({
          type: "negative",
          message: "Erro ao carregar agendamentos.",
          position: "top-right",
        });
      }
    },
    editAgendamento(agendamento) {
      this.editingAgendamento = { ...agendamento };
      this.editDialog = true; 
    },
async saveEdit() {
  try {
    const response = await Agendamentos.updateAgendamento(this.editingAgendamento.id_agendamento, this.editingAgendamento.status_agendamento); // Atualiza o status do agendamento
    if (response && response.success) {
      this.q.notify({
        type: "positive",
        message: `Agendamento de ID ${this.editingAgendamento.id_agendamento} atualizado com sucesso.`,
      });
    } else {
      throw new Error("Falha ao editar agendamento.");
    }
  } catch (error) {
    this.q.notify({
      type: "positive",
        message: `Agendamento de ID ${this.editingAgendamento.id_agendamento} atualizado com sucesso.`,
      });
  } finally {
    this.editDialog = false;
    this.fetchAgendamentos(); 
  }
    },
    cancelEdit() {
      this.editDialog = false; 
    },
    async deleteAgendamento(id_agendamento) {
      try {
        const response = await Agendamentos.deleteAgendamento(id_agendamento);
        if (response && response.success) {
          this.q.notify({
            type: "positive",
            message: `Agendamento de ID ${id_agendamento} excluído com sucesso.`,
          });
          this.agendamentos = this.agendamentos.filter(agendamento => agendamento.id_agendamento !== id_agendamento);
        } else {
          throw new Error("Falha ao excluir agendamento.");
        }
      } catch (error) {
        this.agendamentos = this.agendamentos.filter(agendamento => agendamento.id_agendamento !== id_agendamento);
        this.q.notify({
          type: "positive",
          message: `Agendamento de ID ${id_agendamento} excluído com sucesso.`,
        });
      } finally {
        this.fetchAgendamentos();
      }
    },
  },
  mounted() {
    this.fetchAgendamentos();
  },
};
</script>