<template>
  <div class="row items-center justify-evenly">
    <q-table title="" :data="data.words" :columns="columns" row-key="name">
      <q-tr slot="header" slot-scope="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td>
          <span class="row justify-center items-center full-height full-width">
            <span class="q-pr-xs">
              {{ props.row["stem"] }}
            </span>
            <span v-if="props.row['lang'] === 'de'">
              <q-img
                :src="'/flags/germany.png'"
                spinner-color="white"
                style="height: 15px; width: 16px;"
              />
            </span>
            <span v-if="props.row['lang'] === 'en'">
              <q-img
                :src="'/flags/united-kingdom.png'"
                spinner-color="white"
                style="height: 15px; width: 16px;"
              />
            </span>
            <span v-if="props.row['lang'] === 'pt'">
              <q-img
                :src="'/flags/brazil.png'"
                spinner-color="white"
                style="height: 15px; width: 16px;"
              />
            </span>

          </span>
        </q-td>

        <q-td style="width: 400px">
          <MeaningColumn
            :meaning="props.row['meaning']"
            :lang="props.row['lang']"
            :stem="props.row['stem']"
          />
        </q-td>

        <q-td style="width: 100px">
          <ContextColumn
            v-bind:lookUps="props.row['lookUps']"
            :books="data.books"
          />
        </q-td>

        <q-td> </q-td>

        <q-td> </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import MeaningColumn from "./MeaningColumn.vue";
import ContextColumn from "./ContextColumn.vue";

export default defineComponent({
  name: "VocabsTable",
  props: ["data"],
  components: { MeaningColumn, ContextColumn },
  data() {
    return {
      columns: [
        {
          name: "word",
          label: "Word",
          required: true,
          align: "center",
          sortable: true
        },
        {
          name: "meaning",
          label: "Meaning",
          required: true,
          align: "center",
          sortable: true
        },
        {
          name: "context",
          label: "Context",
          required: true,
          align: "center",
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          required: true,
          align: "center",
          sortable: true
        },
        {
          name: "action",
          label: "Action",
          required: true,
          align: "center",
          sortable: true
        }
      ]
    };
  },
  methods: {
    flagPath(lang) {
      let country;
      if (lang === "de") {
        country = "germany";
      } else if (lang === "en") {
        country = "united-kingdom";
      } else if (lang === "pt-BR") {
        country = "brazil";
      }
      return country;
    }
  }
});
</script>
