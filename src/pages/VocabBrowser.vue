<template>
  <q-page class="row items-center justify-evenly">
    <VocabsTable v-bind:data="formatedEntries"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapActions } from 'vuex'
import VocabsTable from '../components/VocabsTable.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { VocabsTable },
  mounted () {
    this.updateState
  },
  computed: {
    ...mapGetters('databaseModule', [
      'formatedEntries'
    ]),
    ...mapActions('databaseModule', [
      'updateState'
    ])
  }
})
</script>
