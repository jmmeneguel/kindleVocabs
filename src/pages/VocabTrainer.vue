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
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            G
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ deck.name }}</q-item-label>
          <q-item-label caption lines="1"
            >{{ deck.vocabs.length }} Vocabs</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-icon name="create" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item class="q-py-sm" clickable v-ripple @click="createDeck=true">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-btn icon="add" click="editDeck" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Create new</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <CreateDeck :createDeck.sync="createDeck"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CreateDeck from '../components/CreateDeck.vue'

export default defineComponent({
  name: 'VocabTrainer',

  components: {CreateDeck},

  data() {
    return {
      createDeck: false,
      decks: [
        {
          id: 0,
          name: 'German words',
          vocabs: []
        }
      ]
    }
  }
})
</script>
