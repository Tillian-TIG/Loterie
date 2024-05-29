<template>
  <section class="home">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <video src="/1.mp4" class="video-slide" autoplay muted loop></video>
    <div class="content">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Points</th>
            <th>Descriptions</th>
            <th>Extraire</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!fileData || fileData.length === 0">
            <td colspan="3">Aucun fichier chargé. Veuillez charger un fichier depuis la page précédente.</td>
          </tr>
          <tr v-for="(group, index) in filteredPointGroups" :key="index">
            <td>{{ group.label }}</td>
            <td>Liste des gagnants du {{ group.label }}</td>
            <td class="center-button"><button @click="selectWinners(group)" class="download-button"><i class="fa fa-trophy"></i> Tirer au sort</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getFileData']),
    fileData() {
      return this.getFileData;
    },
    filteredPointGroups() {
      return this.pointGroups.filter(group => this.filteredData(group).length > 0);
    }
  },
  data() {
    return {
      pointGroups: [
        { label: '1500 et moins de 2000', minPoints: 1500, maxPoints: 2000 },
        { label: '2000 et moins de 3000', minPoints: 2000, maxPoints: 3000 },
        { label: '3000 et moins de 5000', minPoints: 3000, maxPoints: 5000 },
        { label: '5000 et plus', minPoints: 5000, maxPoints: Infinity },
      ]
    };
  },
  methods: {
    ...mapActions(['selectRandomWinners']),
    filteredData(group) {
      return this.fileData.filter(row => {
        const points = row[1];
        return points >= group.minPoints && points < group.maxPoints;
      });
    },
    selectWinners(group) {
      this.selectRandomWinners(group);
      this.$router.push({ name: 'result_page' });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:wight');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

section {
  padding: 100px 200px;
}

.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.home .content {
  z-index: 888;
  color: #fff;
  text-align: center;
}

.home video {
  z-index: 000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #e6e5e5;
  padding: 8px;
  text-align: center;
}

.table th {
  background-color: #2696E9;
  color: white;
}

.table td {
  background-color: rgba(255, 255, 255, 0.945);
  color: #141414;
  font-weight:500;
}

.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-button {
  background-color: #f36f21;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.download-button i {
  margin-right: 8px;
}

.download-button:hover {
  background-color: #d45e1a;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #f36f21;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
