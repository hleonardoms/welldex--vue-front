<template>
  <div id="operaciones-table" class="my-4">
    <DataTable
      :value="data"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
    >
      <Column field="id_operacion" header="Id"></Column>
      <Column field="referencia" header="Referencia"></Column>
      <Column field="pedimento" header="Pedimento"></Column>
      <Column field="cliente" header="Cliente"></Column>
      <Column field="aduana" header="Aduana"></Column>
      <Column field="tipo_mercancia" header="Mercancia"></Column>
      <Column field="tipo_operacion" header="Operación"></Column>
      <Column field="estatus" header="Estatus">
        <template #body="entry">
          <Chip
            :label="entry.data.estatus"
            :class="[
              'text-white',
              entry.data.estatus === 'ALTA'
                ? 'bg-green-400'
                : entry.data.estatus === 'ETD'
                ? 'bg-yellow-500'
                : entry.data.estatus === 'ETA'
                ? 'bg-teal-500'
                : 'bg-bluegray-600',
            ]"
          />
        </template>
      </Column>
      <Column field="action" header="Acción">
        <template #body="entry">
          <Button
            @click="onUpdateEntry(entry.data)"
            :disabled="entry.data.estatus === 'DESCARGO'"
            label="Actualizar"
            class="w-full p-button-secondary"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Chip from 'primevue/chip'
import Button from 'primevue/button'

import api from '../api'

export default {
  name: 'OperacionesTable',
  components: {
    DataTable,
    Column,
    Chip,
    Button,
  },
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.fetchOperaciones()

    this.emitter.on('on-refresh-operaciones', (evt) => {
      this.fetchOperaciones()
    })
  },
  methods: {
    async fetchOperaciones() {
      try {
        const { data } = await api.get('/operaciones')
        this.data = data
      } catch (error) {
        console.error(error)
      }
    },
    onUpdateEntry(val) {
      const { id_operacion, estatus, tipo_operacion, tipo_mercancia } = val

      if (estatus === 'ALTA') {
        this.emitter.emit('open-modal-operacion', {
          title: 'Actualizar operación',
          component: 'exportacionImportacionForm',
          id_operacion,
          estatus_operacion: estatus,
          tipo_operacion,
        })
      }

      if (
        estatus === 'ETA' ||
        (estatus === 'ETD' && tipo_mercancia === 'CONTENEDOR')
      ) {
        this.emitter.emit('open-modal-operacion', {
          title: 'Descargar contenedores',
          component: 'descargaContenedoresTable',
          id_operacion,
          estatus_operacion: estatus,
          tipo_operacion,
        })
      }

      if (
        estatus === 'ETA' ||
        (estatus === 'ETD' && tipo_mercancia === 'CARGA_SUELTA')
      ) {
        this.emitter.emit('open-modal-operacion', {
          title: 'Descargar carga suelta',
          component: 'descargaCargaSueltaForm',
          id_operacion,
          estatus_operacion: estatus,
          tipo_operacion,
        })
      }
    },
  },
}
</script>

<style scoped></style>
