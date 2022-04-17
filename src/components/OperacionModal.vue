<template>
  <Dialog
    :header="title"
    v-model:visible="isVisible"
    :closeOnEscape="false"
    :modal="true"
    style="width: 100%; max-width: 1024px"
  >
    <operacion-form
      v-if="visibleComponent === 'operacionForm'"
    ></operacion-form>
    <exportacion-importacion-form
      v-if="visibleComponent === 'exportacionImportacionForm'"
      :idOperacion="idOperacion"
      :estatusOperacion="estatusOperacion"
      :tipoOperacion="tipoOperacion"
    ></exportacion-importacion-form>
    <descarga-contenedores-table
      v-if="visibleComponent === 'descargaContenedoresTable'"
      :operacionId="idOperacion"
    ></descarga-contenedores-table>
    <descarga-carga-suelta-form
      v-if="visibleComponent === 'descargaCargaSueltaForm'"
      :operacionId="idOperacion"
    ></descarga-carga-suelta-form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import OperacionForm from '../components/OperacionForm.vue'
import ExportacionImportacionForm from '../components/ExportacionImportacionForm.vue'
import DescargaContenedoresTable from '../components/DescargaContenedoresTable.vue'
import DescargaCargaSueltaForm from '../components/DescargaCargaSueltaForm.vue'

export default {
  name: 'OperacionModal',
  components: {
    Dialog,
    OperacionForm,
    ExportacionImportacionForm,
    DescargaContenedoresTable,
    DescargaCargaSueltaForm,
  },
  data() {
    return {
      isVisible: false,
      title: '',
      visibleComponent: '',
      idOperacion: '',
      estatusOperacion: '',
      tipoOperacion: '',
    }
  },
  created() {
    this.emitter.on('open-modal-operacion', (evt) => {
      this.title = evt.title
      this.visibleComponent = evt.component
      this.idOperacion = evt.id_operacion ?? ''
      this.estatusOperacion = evt.estatus_operacion ?? ''
      this.tipoOperacion = evt.tipo_operacion ?? ''
      this.isVisible = true
    })
    this.emitter.on('close-modal-operacion', (evt) => {
      this.title = ''
      this.visibleComponent = ''
      this.isVisible = false
    })
  },
}
</script>

<style lang="scss" scoped></style>
