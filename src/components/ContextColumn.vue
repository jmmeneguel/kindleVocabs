<template>
  <div class="context row items-center justify-evenly">
    <q-list separator class="full-width">
      <q-item v-ripple v-for="item in lookUps">
        <q-tooltip anchor="bottom middle" self="center middle" content-style="font-size: 12px">
          {{ getBookName(item) }}
        </q-tooltip>
        <q-item-section>{{ item.context }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ContextColumn',
  props: ['lookUps', 'books'],
  methods: {
    getBookName (item: { id: any }) {
      let bookInfo
      for (const book of this.books) {
        if (book.id === item.bookId) {
          bookInfo = book
          break
        }
      }
      return bookInfo.title
    }
  }
})
</script>
<style scoped lang="sass">
.context 
  white-space: normal !important

</style>