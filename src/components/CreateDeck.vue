<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 70%">
      <q-card-section>
        <div class="text-h6">Create Deck</div>
      </q-card-section>
      <q-scroll-area style="height: 300px">
        <q-card-section class="q-pt-none full-height">
          <div class="full-height full-width">
            <q-input
              filled
              v-model="deckConfig.name"
              class="q-pb-md full-width text-h6"
              label="Label"
              bottom-slots
              dense
            />
            <SpecialSelect
              label="Languages"
              :options="languageOptions"
              :filter.sync="languageFilter"
              class="q-pb-md full-width"
            />
            <SpecialSelect
              label="Books"
              :options="bookOptions"
              :filter.sync="bookFilter"
              class="q-pb-md  full-width"
            />

            <q-input
              dense
              label="Number of new words per day"
              class="q-pb-md full-width"
              v-model.number="newWords"
              type="number"
              filled
            />

            <q-input
              dense
              label="Number of reviews per day"
              class="q-pb-md full-width"
              v-model.number="reviews"
              type="number"
              filled
            />
          </div>
        </q-card-section>
      </q-scroll-area>

      <q-card-actions align="right">
        <q-btn flat label="Save" v-close-popup />
        <q-btn flat label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapActions } from 'vuex'
import SpecialSelect from '../components/SpecialSelect.vue'

export default defineComponent({
  name: 'CreateDeck',

  components: { SpecialSelect },

  props: {
    createDeck: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      deckConfig: {},
      newWords: 5,
      reviews: 30,
      languageFilter: [],
      bookFilter: []
    }
  },

  computed: {
    ...mapGetters('databaseModule', [
      'filteredEntries',
      'languageOptions',
      'bookOptions'
    ]),

    showDialog: {
      // getter
      get: function(): boolean {
        return this.createDeck
      },
      // setter
      set: function(newValue: boolean) {
        this.$emit('update:createDeck', newValue)
      }
    }
  }
})
</script>
