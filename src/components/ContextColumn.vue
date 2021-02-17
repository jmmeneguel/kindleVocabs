<template>
  <div class="row items-center justify-evenly">
    Context
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ContextColumn',
  props: ['context']
})
</script>