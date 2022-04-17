<template>
  <div
    class="flex-column justify-content-center align-content-center"
    style="width: 100%; max-width: 1300px; margin: auto"
  >
    <Button
      @click="showModalOperacion"
      label="Nueva operación"
      class="w-full"
    ></Button>
    <Message v-if="message.value" :life="5000" :severity="message.type">{{
      message.value
    }}</Message>
    <operaciones-table></operaciones-table>
    <operacion-modal></operacion-modal>
  </div>
</template>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import OperacionesTable from '../components/OperacionesTable.vue'
import OperacionModal from '../components/OperacionModal.vue'

export default {
  name: 'OperacionesLayout',
  components: {
    Button,
    Dialog,
    Message,
    OperacionesTable,
    OperacionModal,
  },
  data() {
    return {
      message: {
        type: '',
        value: '',
      },
    }
  },
  created() {
    this.emitter.on('set-message', (evt) => {
      this.message.type = evt.type
      this.message.value = evt.value
    })
  },
  methods: {
    showModalOperacion() {
      this.emitter.emit('open-modal-operacion', {
        title: 'Nueva operación',
        component: 'operacionForm',
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
