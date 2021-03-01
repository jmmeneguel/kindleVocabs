<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 70%">
      <q-card-section>
        <div class="text-h6">Create Deck</div>
      </q-card-section>
      <q-scroll-area style="height: 300px">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="deckConfig.name"
            class="q-pa-lg text-h6"
            label="Label"
            bottom-slots
            dense
          />
        </q-card-section>
        <SpecialSelect
          label="Languages"
          :options="languageOptions"
          :filter.sync="languageFilter"
        />
        <SpecialSelect
          label="Languages"
          :options="languageOptions"
          :filter.sync="languageFilter"
        />
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
      languageFilter: [
        {
          value: 'en',
          label: 'English'
        }
      ],
      languageOptions: [
        {
          value: 'en',
          label: 'English'
        }
      ]
    }
  },

  computed: {
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
