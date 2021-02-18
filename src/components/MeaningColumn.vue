<template>
  <div class="meaning row items-center justify-evenly">
    <div class="q-pa-lg" v-for="item in meaning">
      <div>{{ item.word }}</div>
      {{item}}
      <q-separator />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MeaningColumn',
  props: ['meaning']
})
</script>
<style scoped lang="sass">
.meaning 
  white-space: normal !important

</style>