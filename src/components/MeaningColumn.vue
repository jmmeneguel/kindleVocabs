<template>
  <div class="meaning row full-width items-center justify-evenly">
    <div class="q-pa-sm full-width" v-for="(item, meaningId) in meaning" :key="meaningId">
      <div class="header column items-center">
        <div v-if="item.word !== stem || meaning.length > 1" class="col text-primary">{{ item.word }}</div>
        <div class="col" v-if="lang === 'en'">
          <span
            class="text-center"
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
        <div v-for="(wMeaning, wMeaningId) in item.meaning" :key="wMeaningId">
          <div class="text-center text-overline text-uppercase">
            {{ wMeaning.partOfSpeech }}
          </div>
          <div>
            <q-list class="rounded-borders">
              <q-expansion-item
                v-for="(definition, defId) in wMeaning.definitions"
                separator
                class="text-body2 text-center"
                :label="definition.definition"
                :key="defId"
              >
                <q-card>
                  <q-card-section>
                    <div class="example text-caption text-grey-9">
                      {{ definition.example }}
                    </div>
                    <div v-if="definition.synonyms && definition.synonyms.length > 0" class="synonyms">
                      <q-chip
                        v-for="(synonym, synonymId ) in definition.synonyms"
                        :key="synonymId"
                        size="11px"
                        color="primary"
                        text-color="white"
                      >
                        {{ synonym }}
                      </q-chip>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "MeaningColumn",
  props: ["meaning", "lang", "stem"],
  methods: {
    play(url) {
      const audio = new Audio(url);
      audio.play();
    }
  }
});
</script>
<style scoped lang="sass">
.meaning
  white-space: normal !important
</style>
