<template>
  <div class="container" v-if="current">
    <div class="row">
      <div class="col col-lg-6">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-3 text-center board-title">
              <span
                v-bind:class="current === players.a && 'current'"
                v-bind:style="{ 'border-bottom-color': players.a.color }"
              >{{ players.a.name }}</span>
              <span class="mx-2">vs.</span>
              <span
                v-bind:class="current === players.b && 'current'"
                v-bind:style="{ 'border-bottom-color': players.b.color }"
              >{{ players.b.name }}</span>
            </h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div
                v-for="[key, value] in Object.entries(board)"
                v-bind:key="key"
                v-bind:class="['col-4 square d-flex align-items-center justify-content-center', value.player ? 'played' : 'unplayed']"
                @click="playSquare($event, key, value)"
              >
                <div>
                  <i
                    v-bind:class="(value.player || current).icon"
                    v-bind:style="{ color: (value.player || current).color }"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import IBoard from "@/models/IBoard";
import IPlayer from "@/models/IPlayer";
import ICell from "@/models/ICell";

@Component
export default class TicTacToe extends Vue {
  @State board!: IBoard;
  @State players!: { [_: string]: IPlayer };
  @Action playCell!: (payload: { key: keyof IBoard; player: IPlayer }) => void;

  public current: IPlayer | null = null;

  mounted() {
    this.current = this.players.a;
  }

  playSquare(event: Event, key: keyof IBoard, value: ICell) {
    event.preventDefault();

    if (value.player) {
      return null;
    }

    this.playCell({ key, player: this.current! });

    this.current = this.current === this.players.a ? this.players.b : this.players.a;
  }
}
</script>

<style lang="scss" scoped>
$borderSize: 2px;

.board-title {
  > span {
    border-bottom: 2px solid;

    &.current {
      transition: 500ms ease-in;
    }

    &:not(.current) {
      transition: 500ms ease-out;
      border-bottom-color: transparent !important;
    }
  }
}

.square {
  margin-top: -$borderSize;
  margin-left: -$borderSize;

  border: $borderSize solid #d2d2d2d4;

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    border-top: none;
  }

  &:nth-of-type(1),
  &:nth-of-type(4),
  &:nth-of-type(7) {
    border-left: none;
  }

  &:nth-of-type(3),
  &:nth-of-type(6),
  &:nth-of-type(9) {
    border-right: none;
  }

  &:nth-of-type(7),
  &:nth-of-type(8),
  &:nth-of-type(9) {
    border-bottom: none;
  }

  > div {
    transition: opacity 500ms ease-in;
  }

  &.played > div {
    opacity: 1;
    visibility: visible;
  }

  &.unplayed {
    cursor: pointer;

    > div {
      opacity: 0;
      visibility: hidden;
    }
  }

  &:hover:not(.played) {
    background: #eaeaead4;

    > div {
      opacity: 0.5;
      visibility: visible;
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
