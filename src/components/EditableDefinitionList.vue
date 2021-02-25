<template>
  <div>
    <q-list class="rounded-borders">
      <q-expansion-item
        v-for="(definition, defId) in definitions"
        separator
        class="text-body2"
        :key="defId"
        @mouseenter.native="
          onExpansion = true
          defIdOver = defId
        "
        @mouseleave.native="onExpansion = false"
      >
        <template v-slot:header>
          <q-item-section>
            <div class="row full-width justify-around items-center">
              <span
                class="col"
                style="overflow: auto;min-width: 30px; max-width: 30px;"
                v-if="onExpansion && defIdOver === defId"
              >
                <q-btn
                  flat
                  dense
                  round
                  icon="cancel"
                  size="sm"
                  @click="deleteDefitinion(defId)"
                />
              </span>

              <span class="col-grow">
                <q-input
                  borderless
                  autogrow
                  dense
                  v-model="definition.definition"
                  style="overflow: auto"
                />
              </span>
            </div>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div class="example text-caption text-grey-9">
              <q-input
                v-model="definition.example"
                label="Example"
                bottom-slots
                dense
              />
            </div>
            <div
              v-if="definition.synonyms && definition.synonyms.length > 0"
              class="synonyms"
            >
              <q-chip
                v-for="(synonym, synonymId) in definition.synonyms"
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
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'EditableDefinitionList',
  props: ['definitions'],
  data() {
    return {
      onExpansion: false,
      defIdOver: ''
    }
  },
  methods: {
    deleteDefitinion(defId: number) {
      this.definitions.splice(defId, 1)
    }
  }
})
</script>
