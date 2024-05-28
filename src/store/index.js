// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    fileData: []  // Stocke les données du fichier
  },
  mutations: {
    setFileData(state, data) {
      state.fileData = data;
    }
  },
  actions: {
    updateFileData({ commit }, data) {
      commit('setFileData', data);
    }
  },
  getters: {
    getFileData: state => state.fileData
  }
});
