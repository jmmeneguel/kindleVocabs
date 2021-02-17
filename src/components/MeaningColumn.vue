<template>
  <div class="row items-center justify-evenly">
    Meaning
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MeaningColumn',
  props: ['wordInfo']
})
</script>
