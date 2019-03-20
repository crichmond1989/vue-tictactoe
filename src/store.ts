import vue from "vue";
import vuex, { Store } from "vuex";
import IBoard from "./models/IBoard";
import IPlayer from "./models/IPlayer";

vue.use(vuex);

export default new Store({
  state: {
    board: {
      a1: { player: undefined },
      a2: { player: undefined },
      a3: { player: undefined },
      b1: { player: undefined },
      b2: { player: undefined },
      b3: { player: undefined },
      c1: { player: undefined },
      c2: { player: undefined },
      c3: { player: undefined },
    } as IBoard,
    players: {
      a: {
        color: "red",
        icon: "x",
        name: "Chris",
      },
      b: {
        color: "blue",
        icon: "o",
        name: "Joy",
      },
    } as { [_: string]: IPlayer },
  },
  mutations: {
    playCell(state, { key, player }: { key: keyof IBoard; player: IPlayer }) {
      state.board[key]!.player = player;
    },
  },
  actions: {
    playCell({ commit }, payload: { key: keyof IBoard; player: IPlayer }) {
      commit("playCell", payload);
    },
  },
});
