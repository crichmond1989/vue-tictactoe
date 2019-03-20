<template>
  <div class="container">
    <div class="row">
      <div class="col">Current Player: {{ current && current.name }}</div>
    </div>
    <div class="row">
      <div
        class="col-4 border square d-flex align-items-center justify-content-center"
        v-for="[key, value] in Object.entries(board)"
        v-bind:key="key"
        @click="playSquare($event, key, value)"
      >
        <div v-bind:class="[ value.player ? 'visible' : 'invisible' ]">
          <i
            v-bind:class="(value.player || current).icon"
            v-bind:style="{ color: (value.player || current).color }"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import { State } from "vuex-class";
import IBoard from "@/models/IBoard";
import IPlayer from "@/models/IPlayer";
import ICell from "@/models/ICell";

@Component
export default class TicTacToe extends Vue {
  @State board!: IBoard;
  @State players!: { [_: string]: IPlayer };

  public current: IPlayer | null = null;

  mounted() {
    this.current = this.players.a;
  }

  playSquare(event: Event, key: keyof IBoard, value: ICell) {
    event.preventDefault();

    if (value.player) {
      return null;
    }

    this.board[key]!.player = this.current!;
    this.current = this.current === this.players.a ? this.players.b : this.players.a;
  }
}
</script>

<style lang="scss" scoped>
.square {
  margin-top: -1px;
  margin-left: -1px;

  &:hover {
    background: #eaeaead4;

    > div {
      opacity: 0.5;
      visibility: visible !important;
    }
  }
}

.o::before {
  content: "O";
}

.x::before {
  content: "X";
}
</style>
