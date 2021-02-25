<template>
  <div class="context row items-center justify-evenly">
    <q-list separator class="full-width">
      <q-item v-ripple v-for="(item, id) in lookUps" :key="id">
        <q-tooltip
          anchor="bottom middle"
          self="center middle"
          content-style="font-size: 12px"
        >
          {{ getBookName(item) }}
        </q-tooltip>
        <q-item-section class="text-center">{{ item.context }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { BookInfo } from '../core/classes/BookInfo'
import { LookUp } from '../core/classes/LookUp'

export default defineComponent({
  name: 'ContextColumn',

  props: {
    lookUps: {
      type: Object as () => LookUp[],
      required: true
    },
    books: {
      type: Object as () => BookInfo[],
      required: true
    }
  },

  methods: {
    getBookName(item: { bookId: any }): string | undefined {
      let bookInfo: BookInfo
      for (const book of this.books) {
        if (book.id === item.bookId) {
          bookInfo = book
          return bookInfo.title
        }
      }
    }
  }
})
</script>
<style scoped lang="sass">
.context
  white-space: normal !important
</style>
