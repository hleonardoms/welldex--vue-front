<template>
  <div id="operacion-form">
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label>Referencia *</label>
        <InputText
          type="text"
          v-model="operacion.referencia"
          class="w-full"
          placeholder="Referencia"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>Pedimento *</label>
        <InputText
          type="text"
          v-model="operacion.pedimento"
          class="w-full"
          placeholder="Pedimento"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>Cliente *</label>
        <InputText
          type="text"
          v-model="operacion.cliente"
          class="w-full"
          placeholder="Cliente"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>Aduana *</label>
        <InputText
          type="text"
          v-model="operacion.aduana"
          class="w-full"
          placeholder="Aduana"
        />
      </div>
      <div class="field col-12">
        <label>Patente *</label>
        <InputText
          type="text"
          v-model="operacion.patente"
          class="w-full"
          placeholder="Patente"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>Tipo de mercancia *</label>
        <Dropdown
          v-model="operacion.tipo_mercancia"
          :options="tiposMercanciaArr"
          optionLabel="name"
          optionValue="value"
          placeholder="Seleccione una opción..."
          class="w-full"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>Tipo de operación *</label>
        <Dropdown
          v-model="operacion.tipo_operacion"
          :options="tiposOperacionArr"
          optionLabel="name"
          optionValue="value"
          placeholder="Seleccione una opción..."
          class="w-full"
        />
      </div>
    </div>
    <template v-if="operacion.tipo_mercancia === 'CONTENEDOR'">
      <div
        v-for="(item, index) in contenedores"
        :key="index"
        class="formgrid grid"
      >
        <div class="field col-12">
          <Divider align="left">
            <b>Contenedor #{{ ++index }}</b>
          </Divider>
        </div>
        <div class="field col-12 md:col-6">
          <label>Número de contenedor *</label>
          <InputText
            type="text"
            v-model="item.numero_contenedor"
            class="w-full"
            placeholder="Número de contenedor"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label>Tipo de contenedor *</label>
          <InputText
            type="text"
            v-model="item.tipo_contenedor"
            class="w-full"
            placeholder="Tipo de contenedor"
          />
        </div>
        <div class="field col-12">
          <label>Dimensiones del contenedor *</label>
          <InputText
            type="text"
            v-model="item.dimensiones"
            class="w-full"
            placeholder="Dimensiones del contenedor"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <Button
            @click="addContenedor"
            label="Agregar contenedor"
            class="w-full"
          ></Button>
        </div>
        <div class="field col-12 md:col-6" v-if="contenedores.length > 1">
          <Button
            @click="removeContenedor"
            label="Remover contenedor"
            class="w-full p-button-danger"
          ></Button>
        </div>
      </div>
    </template>
    <template v-if="operacion.tipo_mercancia === 'CARGA_SUELTA'">
      <div class="formgrid grid">
        <div class="field col-12">
          <Divider align="left">
            <b>Carga suelta</b>
          </Divider>
        </div>
        <div class="field col-12 md:col-6">
          <label>Descripción *</label>
          <InputText
            type="text"
            v-model="carga_suelta.descripcion"
            class="w-full"
            placeholder="Descripción"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label>Cantidad *</label>
          <InputText
            type="text"
            v-model="carga_suelta.cantidad"
            class="w-full"
            placeholder="Cantidad"
          />
        </div>
      </div>
    </template>
    <div class="formgrid grid">
      <div class="field col-12" v-if="message.value">
        <Message :severity="message.type">{{ message.value }}</Message>
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
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import Message from 'primevue/message'
import api from '../api'

export default {
  name: 'OperacionForm',
  components: {
    InputText,
    Dropdown,
    Divider,
    Button,
    Message,
  },
  data() {
    return {
      message: {
        type: '',
        value: '',
      },
      operacion: {
        referencia: '',
        pedimento: '',
        cliente: '',
        aduana: '',
        patente: '',
        tipo_mercancia: '',
        tipo_operacion: '',
      },
      contenedores: [
        {
          numero_contenedor: '',
          tipo_contenedor: '',
          dimensiones: '',
        },
      ],
      carga_suelta: {
        descripcion: '',
        cantidad: '',
      },
      tiposMercanciaArr: [
        {
          name: 'Contenedor',
          value: 'CONTENEDOR',
        },
        {
          name: 'Carga suelta',
          value: 'CARGA_SUELTA',
        },
      ],
      tiposOperacionArr: [
        {
          name: 'Importación',
          value: 'IMPORTACION',
        },
        {
          name: 'Exportación',
          value: 'EXPORTACION',
        },
      ],
    }
  },
  methods: {
    addContenedor() {
      this.contenedores.push({
        numero_contenedor: '',
        tipo_contenedor: '',
        dimensiones: '',
      })
    },
    removeContenedor() {
      this.contenedores.pop()
    },
    async onSubmit() {
      const operacion = { ...this.operacion }
      const contenedores = [...this.contenedores]
      const carga_suelta = { ...this.carga_suelta }

      if (
        !operacion.referencia ||
        !operacion.pedimento ||
        !operacion.cliente ||
        !operacion.aduana ||
        !operacion.patente ||
        !operacion.tipo_mercancia ||
        !operacion.tipo_operacion
      ) {
        this.message.type = 'error'
        this.message.value =
          'No se han registrado todos los campos requeridos *'
        return
      }

      if (operacion.tipo_mercancia === 'CONTENEDOR') {
        for (const element of contenedores) {
          if (
            !element.numero_contenedor ||
            !element.tipo_contenedor ||
            !element.dimensiones
          ) {
            this.message.type = 'error'
            this.message.value =
              'No se han registrado todos los campos requeridos del contenedor*'
            return
          }
        }
      }

      if (operacion.tipo_mercancia === 'CARGA_SUELTA') {
        if (!carga_suelta.descripcion || !carga_suelta.cantidad) {
          this.message.type = 'error'
          this.message.value =
            'No se han registrado todos los campos requeridos de la carga*'
          return
        }
      }

      let data = { ...operacion }

      if (operacion.tipo_mercancia === 'CONTENEDOR') {
        data['contenedores'] = [...contenedores]
      } else {
        data = { ...data, ...carga_suelta }
      }

      try {
        const { status } = await api.post('/operaciones', data)
        if (status === 201) {
          this.operacion = {
            referencia: '',
            pedimento: '',
            cliente: '',
            aduana: '',
            patente: '',
            tipo_mercancia: '',
            tipo_operacion: '',
          }
          this.contenedores = [
            {
              numero_contenedor: '',
              tipo_contenedor: '',
              dimensiones: '',
            },
          ]
          this.carga_suelta = {
            descripcion: '',
            cantidad: '',
          }

          this.emitter.emit('set-message', {
            type: 'success',
            value: 'Operación creada correctamente.',
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
