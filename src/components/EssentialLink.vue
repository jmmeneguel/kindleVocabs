<template>
  <q-item
    clickable
    @click="pushRoute"
  >
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  methods: {
    pushRoute () {
      this.$router.push(this.route).catch(err => console.log(err))
    }
  }
})
</script>
