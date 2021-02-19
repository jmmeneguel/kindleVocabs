<template>
  <div class="meaning row items-center justify-evenly">
    <div class="q-pa-lg" v-for="(item, meaningId) in meaning" :key="meaningId">
      <div class="header">
        <div>{{ item.word }}</div>
        <div
          v-for="(phoneticInfo, phoneticId) in item.phoneticInfo"
          :key="phoneticId"
        >
          {{ phoneticInfo.text }} {{ phoneticInfo.audio }}
        </div>
      </div>
      <div class="meanings">
        <div v-for="(wMeaning, wMeaningId) in item.meaning" :key="wMeaningId">
          <div>
            {{ wMeaning.partOfSpeech }}
          </div>
          <div class="q-pa-md" style="max-width: 350px">
            <q-list class="rounded-borders">
              <q-expansion-item
                v-for="(definition, defId) in wMeaning.definitions"
                separator
                :label="definition.definition"
                :key="defId"
              >
                <q-card>
                  <q-card-section>
                    <div class="example">
                      {{definition.example}}
                    </div>
                    <div v-if="definition.synonyms.length > 0" class="synonyms">
                      {{definition.synonyms}}
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "MeaningColumn",
  props: ["meaning"]
});
</script>
<style scoped lang="sass">
.meaning
  white-space: normal !important
</style>
