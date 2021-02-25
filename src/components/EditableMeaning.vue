<template>
  <div class="meaning row full-width items-center justify-evenly">
    <div
      class="q-pa-sm full-width"
      v-for="(item, meaningId) in meaning"
      :key="meaningId"
    >
      <div class="header column items-center">
        <div
          v-if="item.word !== stem || meaning.length > 1"
          class="col text-primary"
        >
          {{ item.word }}
        </div>
        <div class="col" v-if="lang === 'en'">
          <span
            v-for="(phoneticInfo, phoneticId) in item.phoneticInfo"
            :key="phoneticId"
          >
            <q-btn
              flat
              no-caps
              :label="phoneticInfo.text"
              color="primary"
              padding="xs"
              @click="play(phoneticInfo.audio)"
            />
          </span>
        </div>
      </div>
      <div class="meanings">
        <div v-for="(meaning, meaningId) in item.meaning" :key="meaningId">
          <div class="text-center text-overline text-uppercase">
            {{ meaning.partOfSpeech }}
          </div>
          <EditableDefinitionList :definitions.sync="meaning.definitions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import EditableDefinitionList from './EditableDefinitionList.vue'

export default defineComponent({
  name: 'EditableMeaningColumn',
  props: ['meaning', 'lang', 'stem'],
  components: { EditableDefinitionList },
  methods: {
    play(url: string) {
      const audio = new Audio(url)
      audio.play().catch(err => console.log(err))
    }
  }
})
</script>
<style scoped lang="sass">
.meaning
  white-space: normal !important
</style>
