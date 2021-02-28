<template>
  <div>
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 70%">
        <q-card-section>
          <div class="text-h6">Edit Item</div>
        </q-card-section>
        <q-scroll-area style="height: 400px">
          <q-card-section class="q-pt-none">
            <q-input
              v-model="memoryItem.stem"
              class="q-pa-lg text-h6"
              label="Label"
              bottom-slots
              dense
            >
              <template v-slot:after>
                <q-btn round dense flat icon="search" size="md" />
              </template>
            </q-input>

            <EditableMeaningColumn
              :meaning="memoryItem.meaning"
              :lang="memoryItem.lang"
              :stem="memoryItem.stem"
            />

            <div
              class="q-pa-lg"
              v-for="(lookUp, lookUpid) in memoryItem.lookUps"
              :key="lookUpid"
            >
              <q-input v-model="lookUp.context" label="Context" autogrow />
            </div>
          </q-card-section>
        </q-scroll-area>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Save"
            @click="this.updateItem(this.memoryItem)"
            v-close-popup
          />
          <q-btn
            flat
            label="Cancel"
            @click="memoryItem = JSON.parse(JSON.stringify(itemToEdit))"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import EditableMeaningColumn from './EditableMeaning.vue'
import { mapActions } from 'vuex'
import { WordsInterface } from '../store/database/state'

export default defineComponent({
  name: 'EditVocab',

  props: {
    editItem: {
      type: Boolean,
      required: true
    },
    itemToEdit: {
      type: Object as () => WordsInterface,
      required: true
    }
  },

  components: { EditableMeaningColumn },

  data() {
    return { memoryItem: {} }
  },

  computed: {
    showDialog: {
      // getter
      get: function(): boolean {
        return this.editItem
      },
      // setter
      set: function(newValue: WordsInterface) {
        this.$emit('update:editItem', newValue)
      }
    }
  },

  watch: {
    $props: {
      handler(newValue, oldValue) {
        if (newValue.editItem) {
          this.memoryItem = JSON.parse(JSON.stringify(newValue.itemToEdit))
        }
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    ...mapActions('databaseModule', ['updateItem'])
  }
})
</script>
