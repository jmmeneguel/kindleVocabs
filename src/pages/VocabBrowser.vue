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
            <MyQSelect v-bind:options="languageOptions" v-bind:filter="languageFilter" style="width:27%; max-width: 30%;"/>

            <q-select
              dense
              dark
              filled
              v-model="bookFilter"
              multiple
              :options="bookOptions"
              label="Book"
              style="width:27%; max-width: 30%;"
            >
              <template v-slot:option="scope">
                <q-item
                  :class="scope.selected ? 'bg-white text-primary text-weight-medium' : 'bg-white text-black'"
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select
              dense
              dark
              filled
              v-model="statusFilter"
              multiple
              :options="statusOptions"
              label="Status"
              style="width:27%; max-width: 30%;"
            >
              <template v-slot:option="scope">
                <q-item
                  :class="scope.selected ? 'bg-white text-primary text-weight-medium' : 'bg-white text-black'"
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
import MyQSelect from "../components/MyQSelect.vue"

export default defineComponent({
  name: "PageIndex",
  components: { VocabsTable, MyQSelect },
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
    ...mapGetters("databaseModule", ["formatedEntries", "languageOptions", "bookOptions", "statusOptions"]),
    ...mapActions("databaseModule", ["updateState"])
  }
});
</script>
