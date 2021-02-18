<template>
  <div>
    <q-file color="purple-12" v-model="model" label="Label" @input="clicked" accept=".db">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { importDbFile } from '../core/func/importDbFile'

export default defineComponent({
  name: 'AddVocabs',
  data () {
    return {
      model: null
    }
  },
  methods: {
    clicked (file: Blob) {
      importDbFile(file).catch(err => console.log(err))
    }
  }
})
</script>
