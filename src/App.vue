<template>
  <div id="app">
    <tic-tac-toe-vue></tic-tac-toe-vue>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicTacToeVue from "@/components/TicTacToe.vue";

@Component({
  components: {
    TicTacToeVue,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";

.square::before {
  content: "";
  display: block;
  padding-top: 100%;
}

i {
  font-size: 3rem;
}
</style>
