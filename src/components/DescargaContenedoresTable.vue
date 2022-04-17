<template>
  <div id="operaciones-table" class="my-4">
    <DataTable
      :value="data"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
    >
      <Column field="id_operacion" header="Id Operación"></Column>
      <Column field="id_contenedor" header="Id Contenedor"></Column>
      <Column field="numero_contenedor" header="Número de contenedor"></Column>
      <Column field="tipo_contenedor" header="Tipo de contenedor"></Column>
      <Column field="fecha_descargo" header="Fecha de descargo"></Column>
      <Column field="action" header="Acción">
        <template #body="entry">
          <Button
            :disabled="entry.data.fecha_descargo"
            @click="onDeleteEntry(entry.data.id_contenedor)"
            label="Descargar"
            class="w-full p-button-danger"
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
  props: {
    operacionId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.fetchContenedores()
  },
  methods: {
    async fetchContenedores() {
      try {
        const { data } = await api.get(`/contenedores/${this.operacionId}`)
        this.data = data
      } catch (error) {
        console.error(error)
      }
    },
    async onDeleteEntry(val) {
      try {
        const { status } = await api.delete(`/contenedores/${val}`)
        if (status === 200) {
          this.fetchContenedores()
          this.emitter.emit('on-refresh-operaciones')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped></style>
