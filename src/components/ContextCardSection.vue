<template>
  <q-item v-ripple>
    <q-item-section avatar>
      <q-img
        :src="url"
        style="width: 60px"
        spinner-color="black"
        class="rounded-borders"
      />

      <q-tooltip
        anchor="bottom middle"
        self="center middle"
        content-style="font-size: 12px"
      >
        {{ getBookName() }}
      </q-tooltip>
    </q-item-section>

    <q-item-section>{{ lookup.context }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapGetters } from 'vuex'

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image()

    image.addEventListener('load', () => {
      resolve(image)
    })

    image.src = url
  })
}

export default defineComponent({
  name: 'ContextCardSection',
  props: {
    lookup: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      url: ''
    }
  },

  computed: {
    ...mapGetters('databaseModule', ['books'])
  },

  created() {
    if (this.url === '') {
      let asin = ''
      for (const book of this.books) {
        if (book.id === this.lookup.bookId) {
          asin = book.asin
        }
      }
      loadImage(`http://images.amazon.com/images/P/${asin}.01.20TRZZZZ.jpg`)
        .then(img => {
          var height = img.height
          var width = img.width
          if (height > 1 && width > 1) {
            this.url = `http://images.amazon.com/images/P/${asin}.01.20TRZZZZ.jpg`
          } else {
            this.url =
              'https://closekids.com.br/wp-content/uploads/2016/10/default-placeholder.png'
          }
        })
        .catch(err => console.log(err))
    }
  },

  methods: {
    getBookName(): string | undefined {
      let bookInfo: BookInfo
      for (const book of this.books) {
        if (book.id === this.lookup.bookId) {
          bookInfo = book
          return bookInfo.title
        }
      }
    }
  }
})
</script>
