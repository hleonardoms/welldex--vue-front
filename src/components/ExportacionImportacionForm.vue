<template>
  <div id="exportacion-importacion-form">
    <div class="formgrid grid" v-if="tipoOperacion === 'EXPORTACION'">
      <div class="field col-12">
        <label>País destino *</label>
        <Dropdown
          v-model="exportacion.pais_destino"
          class="w-full"
          placeholder="Seleccione una opción..."
          optionLabel="name"
          optionValue="value"
          :options="countriesArr"
          :filter="true"
        />
      </div>
      <div class="field col-12">
        <label>Fecha de zarpe *</label>
        <Calendar
          v-model="exportacion.fecha_zarpe"
          class="w-full"
          placeholder="Fecha de zarpe"
          dateFormat="dd-mm-yy"
        />
      </div>
    </div>
    <div class="formgrid grid" v-else>
      <div class="field col-12">
        <label>País origen *</label>
        <Dropdown
          v-model="importacion.pais_origen"
          class="w-full"
          placeholder="Seleccione una opción..."
          optionLabel="name"
          optionValue="value"
          :options="countriesArr"
          :filter="true"
        />
      </div>
      <div class="field col-12">
        <label>Fecha de arribo *</label>
        <Calendar
          v-model="importacion.fecha_arribo"
          class="w-full"
          placeholder="Fecha de arribo"
          dateFormat="dd-mm-yy"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12" v-if="message">
        <Message severity="error">{{ message }}</Message>
      </div>
      <div class="field col-12">
        <Button
          @click="onSubmit"
          label="Enviar"
          class="w-full p-button-success"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import Message from 'primevue/message'
import countriesArr from '../config/countries'
import api from '../api'
import { DateTime } from 'luxon'

export default {
  name: 'ExportacionImportacionForm',
  components: {
    Dropdown,
    Calendar,
    Button,
    Message,
  },
  props: {
    idOperacion: {
      type: Number,
      default: 0,
    },
    estatusOperacion: {
      type: String,
      default: '',
    },
    tipoOperacion: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      DateTime,
      message: '',
      countriesArr: [...countriesArr],
      exportacion: {
        id_operacion: '',
        fecha_zarpe: '',
        pais_destino: '',
      },
      importacion: {
        id_operacion: '',
        fecha_arribo: '',
        pais_origen: '',
      },
    }
  },
  created() {
    if (this.tipoOperacion === 'EXPORTACION') {
      this.exportacion.id_operacion = this.idOperacion
    } else {
      this.importacion.id_operacion = this.idOperacion
    }
  },
  methods: {
    async onSubmit() {
      const exportacion = { ...this.exportacion }
      const importacion = { ...this.importacion }

      if (this.tipoOperacion === 'EXPORTACION') {
        if (
          !exportacion.id_operacion ||
          !exportacion.fecha_zarpe ||
          !exportacion.pais_destino
        ) {
          this.message = 'No se han llenado todos los campos requeridos *'
          return
        }

        exportacion.fecha_zarpe = this.DateTime.fromJSDate(
          exportacion.fecha_zarpe
        ).toFormat('yyyy-MM-dd')

        try {
          const { status } = await api.post('/exportaciones', exportacion)
          if (status === 201) {
            this.emitter.emit('on-refresh-operaciones')
          }
        } catch (error) {
          this.message = 'Ha ocurrido un error por favor intente nuevamente *'
          return
        }
      }

      if (this.tipoOperacion === 'IMPORTACION') {
        if (
          !importacion.id_operacion ||
          !importacion.fecha_arribo ||
          !importacion.pais_origen
        ) {
          this.message = 'No se han llenado todos los campos requeridos *'
          return
        }

        importacion.fecha_arribo = this.DateTime.fromJSDate(
          importacion.fecha_arribo
        ).toFormat('yyyy-MM-dd')

        try {
          const { status } = await api.post('/importaciones', importacion)
          if (status === 201) {
            this.emitter.emit('on-refresh-operaciones')
          }
        } catch (error) {
          this.message = 'Ha ocurrido un error por favor intente nuevamente *'
          return
        }
      }

      this.emitter.emit('set-message', {
        type: 'success',
        value: 'Operación actualizada correctamente.',
      })
      this.emitter.emit('close-modal-operacion')
    },
  },
}
</script>

<style scoped></style>
