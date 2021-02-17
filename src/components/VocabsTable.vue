<template>
  <div class="row items-center justify-evenly">
    <q-table
      title=""
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <q-tr
        slot="header"
        slot-scope="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
      >
        <q-td>
          <span class="row justify-center items-center full-height full-width">
            <span>
              {{ props.row['stem'] }}
            </span>
          </span>
        </q-td>

        <q-td>
          <MeaningColumn v-bind:wordInfo="props.row['wordInfo']" />
        </q-td>

        <q-td>
          <ContextColumn v-bind:context="props.row['context']" />
        </q-td>

        <q-td>
          Status
        </q-td>

        <q-td>
          Action
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MeaningColumn from './MeaningColumn.vue'
import ContextColumn from './ContextColumn.vue'

export default defineComponent({
  name: 'VocabsTable',
  props: ['data'],
  components: { MeaningColumn, ContextColumn },
  data () {
    return {
      columns: [
        {
          name: 'word',
          label: 'Word',
          required: true,
          align: 'center',
          sortable: true,
        },
        {
          name: 'meaning',
          label: 'Meaning',
          required: true,
          align: 'center',
          sortable: true,
        },
        {
          name: 'context',
          label: 'Context',
          required: true,
          align: 'center',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          required: true,
          align: 'center',
          sortable: true,
        },
        {
          name: 'action',
          label: 'Action',
          required: true,
          align: 'center',
          sortable: true,
        }
      ]
    }
  }
})
</script>
