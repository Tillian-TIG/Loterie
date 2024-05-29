// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    fileData: [],
    randomWinners: [],
  },
  mutations: {
    setFileData(state, data) {
      state.fileData = data;
    },
    setRandomWinners(state, winners) {
      state.randomWinners = winners;
    },
  },
  actions: {
    setFileData({ commit }, data) {
      commit('setFileData', data);
    },
    selectRandomWinners({ commit, state }, group) {
      const filteredData = state.fileData.filter(row => {
        const points = row[1];
        return points >= group.minPoints && points < group.maxPoints;
      });

      const shuffled = filteredData.sort(() => 0.5 - Math.random());
      const winners = shuffled.slice(0, 5);

      commit('setRandomWinners', winners);
    },
  },
  getters: {
    getFileData: (state) => state.fileData,
    getRandomWinners: (state) => state.randomWinners,
  },
});
