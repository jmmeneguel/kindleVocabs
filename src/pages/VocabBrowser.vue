<template>
  <q-page class="full-height full-width">
    <div class="column full-width full-height">
      <div
        class="col-auto full-width bg-secondary text-white"
        :style="expanded ? 'max-height: 100%' : 'max-height: 30px'"
      >
        <div class="row items-center justify-between">
          <span
            class="q-pa-xs q-pl-sm text-uppercase text-subtitle2 text-weight-medium"
          >
            Filters
          </span>
          <q-btn
            dense
            round
            flat
            :icon="expanded ? 'expand_less' : 'expand_more'"
            size="sm"
            @click="expanded = !expanded"
          />
        </div>
        <div class="q-pb-sm" v-if="expanded">
          <div class="row justify-around">
            <SpecialSelect
              :dark="true"
              :options="languageOptions"
              :label="'Languages'"
              :filter.sync="filters.languageFilter"
              style="width:30%"
            />
            <SpecialSelect
              :dark="true"
              :options="bookOptions"
              :label="'Books'"
              :filter.sync="filters.bookFilter"
              style="width:30%"
            />
            <!-- <SpecialSelect :options="statusOptions" :label="'Status'" :filter.sync="filters.statusFilter" style="width:30%"/> -->
          </div>
        </div>
      </div>
      <VocabsTable class="col full-width" v-bind:data="entries" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapGetters } from 'vuex'
import VocabsTable from '../components/VocabsTable.vue'
import SpecialSelect from '../components/SpecialSelect.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { VocabsTable, SpecialSelect },
  data() {
    return {
      expanded: false,
      filters: {
        languageFilter: [],
        bookFilter: [],
        statusFilter: []
      }
    }
  },

  computed: {
    ...mapGetters('databaseModule', [
      'filteredEntries',
      'languageOptions',
      'bookOptions'
    ]),

    entries() {
      return this.filteredEntries(this.filters)
    }
  }
})
</script>
