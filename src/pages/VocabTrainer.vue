<template>
  <q-card class="fixed-center" style="width: 70%; min-width: 300px;">
    <q-scroll-area style="height: 400px">
      <q-card-section>
        <q-card-section class="full-width">
          <div class="full-width text-h6 text-center">
            {{ currentTrainerWord.stem }}
          </div>
          <q-list>
            <ContextCardSection
              v-for="(lookup, lookUpId) in currentTrainerWord.lookUps"
              :key="lookUpId"
              :lookup="lookup"
            />
          </q-list>
        </q-card-section>

        <q-separator v-if="showAnswer" />

        <q-card-section v-if="showAnswer">
          <MeaningColumn
            :meaning="currentTrainerWord.meaning"
            :lang="currentTrainerWord.lang"
            :stem="currentTrainerWord.stem"
          />
        </q-card-section>
      </q-card-section>
    </q-scroll-area>

    <q-card-actions
      v-if="showAnswer"
      class="row justify-around items-center no-padding"
    >
      <q-btn-group spread class="fit no-padding">
        <q-btn
          flat
          label="again"
          class="text-white bg-red-9"
          @click="updateWord"
        />
        <q-btn
          flat
          label="hard"
          class="text-white bg-orange-9"
          @click="updateWord"
        />
        <q-btn
          flat
          label="good"
          class="text-white bg-green-9"
          @click="updateWord"
        />
        <q-btn
          flat
          label="easy"
          class="text-white bg-blue-9"
          @click="updateWord"
        />
      </q-btn-group>
    </q-card-actions>
    <q-card-actions v-else class="row justify-center items-center no-padding">
      <q-btn flat @click="showAnswer = true" class="fit">
        SHOW ANSWER
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapMutations } from 'vuex'
import ContextCardSection from '../components/ContextCardSection.vue'
import MeaningColumn from '../components/MeaningColumn.vue'

export default defineComponent({
  name: 'VocabTrainer',

  components: { ContextCardSection, MeaningColumn },

  data() {
    return {
      showAnswer: false
    }
  },

  created() {
    if (this.currentTrainerDeck.id === 0) {
      this.$router.push('decks')
    } else {
      this.updateTrainingWord(this.allWords)
    }
  },

  computed: {
    ...mapGetters('appModule', ['currentTrainerDeck', 'currentTrainerWord']),
    ...mapGetters('databaseModule', ['filteredEntries']),
    allWords: function() {
      return this.filteredEntries({
        bookFilter: this.currentTrainerDeck.bookFilter,
        languageFilter: this.currentTrainerDeck.languageFilter
      }).words
    }
  },

  methods: {
    ...mapMutations('appModule', ['updateTrainingWord']),

    updateWord() {
      this.showAnswer = false
      this.updateTrainingWord(this.allWords)
    }
  }
})
</script>
