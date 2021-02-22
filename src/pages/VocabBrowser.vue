<template>
  <q-page class="full-height">
    <div class="column full-height">
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
            <SpecialSelect :options="languageOptions" :label="'Languages'" :filter.sync="languageFilter" style="width:30%;"/>
            <SpecialSelect :options="bookOptions" :label="'Books'" :filter.sync="bookFilter" style="width:30%;"/>
            <SpecialSelect :options="statusOptions" :label="'Status'" :filter.sync="statusFilter" style="width:30%;"/>
          </div>
        </div>
      </div>
      <VocabsTable class="col" v-bind:data="formatedEntries" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { mapGetters, mapActions } from "vuex";
import VocabsTable from "../components/VocabsTable.vue";
import SpecialSelect from "../components/SpecialSelect.vue"

export default defineComponent({
  name: "PageIndex",
  components: { VocabsTable, SpecialSelect },
  data () {
    return {
      expanded: false,
      languageFilter: [],
      bookFilter: [],
      statusFilter: []
    }
  },
  mounted() {
    this.updateState;
  },
  computed: {
    ...mapGetters("databaseModule", ["formatedEntries", "languageOptions", "bookOptions"]),
    ...mapActions("databaseModule", ["updateState"])
  }
});
</script>
