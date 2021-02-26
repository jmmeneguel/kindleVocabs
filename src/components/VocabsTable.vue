<template>
  <div>
    <q-table
      class="my-sticky-header-table"
      title=""
      :data="data.words"
      :columns="columns"
      row-key="name"
    >
      <q-tr slot="header" slot-scope="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td>
          <span class="row justify-center items-center full-height full-width">
            <span class="q-pr-xs">
              {{ props.row['stem'] }}
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

        <q-td style="width: 40%; max-width: 600px">
          <MeaningColumn
            :meaning="props.row['meaning']"
            :lang="props.row['lang']"
            :stem="props.row['stem']"
          />
        </q-td>

        <q-td style="width: 20%">
          <ContextColumn
            v-bind:lookUps="props.row['lookUps']"
            :books="data.books"
          />
        </q-td>

        <q-td> </q-td>

        <q-td style="width: 90px">
          <q-btn
            dense
            flat
            round
            icon="create"
            size="11px"
            @click="
              itemToEdit = props.row
              editItem = true
            "
          >
            <q-tooltip anchor="bottom middle" self="center middle">
              Edit
            </q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            round
            icon="delete"
            size="11px"
            @click="
              rowId = props.row['id']
              deleteItem = true
            "
          >
            <q-tooltip anchor="bottom middle" self="center middle">
              Delete
            </q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </q-table>
    <EditVocab v-if="editItem" :editItem.sync="editItem" :itemToEdit="itemToEdit" />
    <DeleteVocab v-if="deleteItem" :deleteItem.sync="deleteItem" :rowId="rowId" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MeaningColumn from './MeaningColumn.vue'
import ContextColumn from './ContextColumn.vue'
import EditVocab from './EditVocab.vue'
import DeleteVocab from './DeleteVocab.vue'

interface DatabaseInterface {
  words: []
  books: []
}

export default defineComponent({
  name: 'VocabsTable',
  props: {
    data: {
      type: Object as () => DatabaseInterface,
      required: true
    }
  },
  components: { MeaningColumn, ContextColumn, EditVocab, DeleteVocab },
  data() {
    return {
      editItem: false,
      deleteItem: false,
      rowId: '',
      itemToEdit: {},
      columns: [
        {
          name: 'word',
          label: 'Word',
          required: true,
          align: 'center',
          sortable: true
        },
        {
          name: 'meaning',
          label: 'Meaning',
          required: true,
          align: 'center',
          sortable: true
        },
        {
          name: 'context',
          label: 'Context',
          required: true,
          align: 'center',
          sortable: true
        },
        {
          name: 'status',
          label: 'Status',
          required: true,
          align: 'center',
          sortable: true
        },
        {
          name: 'action',
          label: '',
          required: true,
          align: 'center',
          sortable: true
        }
      ]
    }
  }
})
</script>
<style lang="sass">
.q-table__container
    max-height: 100%

.q-table thead th
    white-space: normal

.q-table tbody td
    white-space: normal

.my-sticky-header-table
  /* height or max-height is important */
  max-height: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

.q-list:not(:last-child)
  border-radius: 0
  border-bottom: 1px solid rgba(0, 0, 0, 0.12)

.q-table__title
  text-transform: uppercase
</style>
