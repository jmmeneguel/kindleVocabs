<template>
  <div>
    <q-select
      dense
      dark
      filled
      v-model="selectFilter"
      multiple
      :options="options"
      :label="label"
    >
      <template v-slot:option="scope">
        <q-item
          :class="
            scope.selected
              ? 'bg-white text-primary text-weight-medium'
              : 'bg-white text-black'
          "
          v-bind="scope.itemProps"
          v-on="scope.itemEvents"
        >
          <q-item-section>
            <q-item-label v-html="scope.opt.label" />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface SelectionOptionInterface {
  value: string,
  label: string
}

export default defineComponent({
  name: 'SpecialSelect',
  props: {
    options: {
      type: Array as () => SelectionOptionInterface[],
      required: true
    },
    filter: {
      type: Array as () => SelectionOptionInterface[],
      required: true
    },
    label: {
      type: String
    }
  },
  computed: {
    selectFilter: {
      // getter
      get: function (): SelectionOptionInterface[] {
        return this.filter
      },
      // setter
      set: function (newValue: SelectionOptionInterface) {
        this.$emit('update:filter', newValue)
      }
    }
  }
})
</script>
