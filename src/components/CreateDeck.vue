<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 50vh;">
      <q-card-section>
        <div class="text-h6">{{ create ? 'Create deck' : 'Edit deck' }}</div>
      </q-card-section>
      <q-scroll-area style="height: 300px">
        <q-card-section class="q-pt-none full-height">
          <div class="full-height full-width">
            <q-input
              filled
              v-model="deckConfig.name"
              class="q-pb-lg full-width text-h6"
              label="Label"
              bottom-slots
              dense
              :rules="[val => !!val || 'Field is required']"
              ref="labelInput"
            />
            <SpecialSelect
              label="Languages"
              :dark="false"
              :options="languageOptions"
              :filter.sync="deckConfig.languageFilter"
              class="q-pb-md full-width"
            />
            <SpecialSelect
              label="Books"
              :dark="false"
              :options="bookOptions"
              :filter.sync="deckConfig.bookFilter"
              class="q-pb-md  full-width"
            />

            <q-input
              dense
              label="Number of new words per day"
              class="q-pb-lg full-width"
              v-model.number="deckConfig.newWords"
              type="number"
              filled
              :rules="[val => !!val || 'Field is required']"
              ref="newWordsInput"
            />

            <q-input
              dense
              label="Number of reviews per day"
              class="q-pb-lg full-width"
              v-model.number="deckConfig.reviews"
              type="number"
              filled
              :rules="[val => !!val || 'Field is required']"
              ref="reviewsInput"
            />
          </div>
        </q-card-section>
      </q-scroll-area>

      <q-card-actions align="right">
        <q-btn flat label="Save" @click="onSubmit" />
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
    create: {
      type: Boolean,
      required: true
    },
    showCreateDeck: {
      type: Boolean,
      required: true
    },
    deckInfo: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters('databaseModule', ['languageOptions', 'bookOptions']),

    showDialog: {
      // getter
      get: function(): boolean {
        return this.showCreateDeck
      },
      // setter
      set: function(newValue: boolean) {
        this.$emit('update:showCreateDeck', newValue)
      }
    },

    deckConfig: {
      // getter
      get: function(): object {
        return this.deckInfo
      },
      // setter
      set: function(newValue: boolean) {
        this.$emit('update:deckInfo', newValue)
      }
    }
  },
  methods: {
    ...mapActions('databaseModule', ['createDeck']),

    onSubmit() {
      const validate_status =
        this.$refs['labelInput'].validate() &&
        this.$refs['newWordsInput'].validate() &&
        this.$refs['reviewsInput'].validate()

      if (validate_status) {
        this.showDialog = false
        this.createDeck({ deckInfo: this.deckConfig, create: this.create })
      }
    }
  }
})
</script>
