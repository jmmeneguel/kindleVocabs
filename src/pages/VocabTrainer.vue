<template>
  <div class="fit bg-light-2">
    <q-card
      v-if="trainingSet.length > 0"
      class="fixed-center"
      style="width: 50%; min-width: 300px;"
    >
      <q-scroll-area style="height: 70vh;">
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
                :word="currentTrainerWord.word"
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
            class="text-white again"
            @click="updateWord(0)"
          />
          <q-btn
            flat
            label="hard"
            class="text-white hard"
            @click="updateWord(1)"
          />
          <q-btn
            flat
            label="good"
            class="text-white good"
            @click="updateWord(2)"
          />
          <q-btn
            flat
            label="easy"
            class="text-white easy"
            @click="updateWord(3)"
          />
        </q-btn-group>
      </q-card-actions>
      <q-card-actions v-else class="row justify-center items-center no-padding">
        <q-btn flat @click="showAnswer = true" class="fit">
          SHOW ANSWER
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card v-else class="fixed-center" style="width: 50%; min-width: 300px;">
      <q-card-section>
        <q-card-section class="full-width">
          <div class="full-width text-h6 text-center">
            No card on deck's training set.
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      this.updateTrainingWords(this.allWords)
      this.updateTrainingWord(-1)
    }
  },

  computed: {
    ...mapGetters('databaseModule', [
      'currentTrainerDeck',
      'currentTrainerWord',
      'trainingSet',
      'filteredEntries'
    ]),
    allWords: function() {
      return this.filteredEntries({
        bookFilter: this.currentTrainerDeck.bookFilter,
        languageFilter: this.currentTrainerDeck.languageFilter
      }).words
    }
  },

  methods: {
    ...mapMutations('databaseModule', ['updateTrainingWords']),
    ...mapActions('databaseModule', ['updateTrainingWord']),

    updateWord(userGrade: number) {
      this.showAnswer = false
      this.updateTrainingWord(userGrade)
    }
  }
})
</script>
<style lang="sass" scoped>
.easy
  background-color: #002554

.good
  background-color: #6878b1

.hard
  background-color: #b36678

.again
  background-color: #510c24

.bg-light-2
  background-color: #F5F5F6
</style>
