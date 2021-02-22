<template>
<div>
optionss: {{options}}
filter: {{filter}}

  <q-select
    dense
    dark
    filled
    v-model="filter"
    multiple
    :options="options"
    label="Language"
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
          <q-item-label v-html="scope.opt" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "MyQSelect",
  props: ["options", "filter"]
})
