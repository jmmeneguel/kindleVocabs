<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App',

  methods: {
    ...mapActions('databaseModule', ['updateState'])
  },

  created() {
    console.log('App created')
    this.updateState()
  }
})
</script>
