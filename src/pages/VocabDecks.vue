<template>
  <q-page class="full-height">
    <q-list bordered>
      <div class="q-ml-lg q-mt-lg text-overline text-uppercase">Decks</div>
      <q-item
        v-for="deck in decks"
        :key="deck.id"
        class="q-py-sm"
        clickable
        v-ripple
        @click="currentDeckToTrain(deck)"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ deck.name.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ deck.name }}</q-item-label>
          <q-item-label caption lines="1"
            >{{ deck.wordIds.length }} Vocabs</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-btn flat round icon="create" @click="editDeck(deck)"></q-btn>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        class="q-py-sm"
        clickable
        v-ripple
        @click="showCreationDeckDialog"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-btn icon="add" @click="editDeck(deckInfoStd)" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Create new</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <CreateDeck
      :showCreateDeck.sync="showCreateDeck"
      :deckInfo="deckEditInfo"
      :create="create"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CreateDeck from '../components/CreateDeck.vue'
import { mapGetters, mapMutations } from 'vuex'
import { Deck } from 'src/store/database/state'

export default defineComponent({
  name: 'VocabDecks',

  components: { CreateDeck },

  data() {
    return {
      showCreateDeck: false,
      deckEditInfo: {},
      deckInfoStd: {
        name: '',
        newWords: 5,
        reviews: 30,
        bookFilter: [],
        languageFilter: [],
        vocabs: []
      },
      create: false
    }
  },

  computed: {
    ...mapGetters('databaseModule', ['decks'])
  },

  methods: {
    ...mapMutations('appModule', ['updateTrainerCurrentDeck']),

    editDeck(deckInfo: {}) {
      this.create = false
      this.deckEditInfo = JSON.parse(JSON.stringify(deckInfo))
      this.showCreateDeck = true
    },

    showCreationDeckDialog() {
      this.create = true
      this.deckEditInfo = JSON.parse(JSON.stringify(this.deckInfoStd))
      this.showCreateDeck = true
    },

    currentDeckToTrain(deck: Deck) {
      this.updateTrainerCurrentDeck(deck)
      this.$router.push('trainer')
    }
  }
})
</script>
