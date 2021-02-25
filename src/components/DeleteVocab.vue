<template>
  <div>
    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you really want to remove this entry?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="primary"
            @click="hideItem(rowId)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'DeleteVocab',
  props: {
    deleteItem: {
      type: Boolean,
      required: true
    },
    rowId: {
      type: String,
      required: true
    }
  },
  computed: {
    showDialog: {
      // getter
      get: function(): boolean {
        return this.deleteItem
      },
      // setter
      set: function(newValue: string) {
        this.$emit('update:deleteItem', newValue)
      }
    }
  },
  methods: {
    ...mapActions('databaseModule', ['hideItem'])
  }
})
</script>
