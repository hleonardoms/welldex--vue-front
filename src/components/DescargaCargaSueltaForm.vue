<template>
  <div class="formgrid grid">
    <div class="field col-12">
      <h5>Descripción:</h5>
      <p>{{ descripcion }}</p>
    </div>
    <div class="field col-12">
      <label>Carga *</label>
      <InputNumber
        v-model="cantidad"
        showButtons
        buttonLayout="horizontal"
        :min="0"
        :step="1"
        class="w-full"
      />
    </div>
    <div class="field col-12">
      <Button
        @click="onSubmit"
        label="Enviar"
        class="w-full p-button-success"
      ></Button>
    </div>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import api from '../api'

export default {
  name: 'DescargaCargaSueltaForm',
  components: {
    InputNumber,
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
      cargaSueltaId: 0,
      descripcion: '',
      cantidad: 0,
    }
  },
  created() {
    this.fetchCargaSuelta()
  },
  methods: {
    async fetchCargaSuelta() {
      try {
        const { data } = await api.get(`/carga-suelta/${this.operacionId}`)
        this.cargaSueltaId = data.id_carga_suelta
        this.descripcion = data.descripcion
        this.cantidad = data.cantidad
      } catch (error) {
        console.error(error)
      }
    },
    async onSubmit() {
      try {
        const { status } = await api.put(
          `/carga-suelta/${this.cargaSueltaId}`,
          {
            id_operacion: this.operacionId,
            cantidad: this.cantidad,
          }
        )
        if (status === 200) {
          this.emitter.emit('set-message', {
            type: 'success',
            value: 'Carga actualizada correctamente.',
          })
          this.emitter.emit('on-refresh-operaciones')
          this.emitter.emit('close-modal-operacion')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
