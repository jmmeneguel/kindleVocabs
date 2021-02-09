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
import * as initSqlJs from 'sql.js'

let SQL

export default defineComponent({
  name: 'App',
  data () {
    return {
      model: null
    }
  },
  async mounted () {
    console.log('mounted')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node
      locateFile: file => 'sql-wasm.wasm'
    })
  },
  methods: {
    clicked (value) {
      console.log(value)
      var r = new FileReader()
      r.onload = function() {
        var Uints = new Uint8Array(r.result)
        const db = new SQL.Database(Uints)

        const bookInfo = db.exec('SELECT * FROM BOOK_INFO')
        console.log(bookInfo)
      }
      r.readAsArrayBuffer(value)
    }
  }
})
</script>
