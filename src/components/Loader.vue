<template>
  <v-dialog hide-overlay persistent width="300" v-model="dialog.value">
    <v-card color="primary" dark>
      <v-card-text>
        {{dialog.title}}
        <v-progress-linear indeterminate color="white" class="mb-0">
        </v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
export default {
name: "Loader",
computed:{
  ...mapState(['dialog'])
}
}
</script>