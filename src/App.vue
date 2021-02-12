<template>
  <div id="q-app">
    <q-file color="purple-12" v-model="model" label="Label" @input="clicked">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { importDbFile } from 'src/core/func/importDbFile'

export default defineComponent({
  name: 'App',
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
