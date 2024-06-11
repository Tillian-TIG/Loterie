<template>
  <section class="home">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <video src="/1.mp4" class="video-slide" autoplay muted loop></video>
    <div class="content">
      <div v-if="winners.length === 0">
        <p>Aucun résultat à afficher. Veuillez tirer au sort depuis la page précédente.</p>
      </div>
      <div v-else class="results-container">
        <transition-group name="fade" tag="div" class="results-container">
          <div v-for="(winner, index) in visibleWinners" :key="index" class="winner-card">
            <img src="/win.jpg" alt="Winner Image" class="winner-image">
            <p>{{ winner[2] }} {{ winner[3] }}</p>
            <p>Numéro : {{ winner[0] }}</p> 
            <p>Points : {{winner[1]}}</p>
          </div>
        </transition-group>
        <div class="center-button">
          <button @click="exportWinners" class="export-button"><i class="fa fa-file-excel"></i> Exporter les gagnants</button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import * as XLSX from 'xlsx';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      visibleWinners: [],
      intervalId: null,
    };
  },
  computed: {
    ...mapGetters(['getRandomWinners']),
    winners() {
      return this.getRandomWinners;
    }
  },
  mounted() {
    this.showWinners();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    showWinners() {
      let index = 0;
      this.intervalId = setInterval(() => {
        if (index < this.winners.length) {
          this.visibleWinners.push(this.winners[index]);
          index++;
        } else {
          clearInterval(this.intervalId);
        }
      }, 3000);
    },
    exportWinners() {
      const ws = XLSX.utils.aoa_to_sheet([
        ['MSISDN', 'POINTS', 'FIRSTNAME', 'LASTNAME', 'PROFILE', 'DATE_SUBSCRIPTION'],
        ...this.winners
      ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Liste_des_gagnants.xlsx');
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

.results-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.winner-card {
  background-color: rgba(255, 255, 255, 0.945);
  border-radius: 15px;
  padding: 15px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.winner-card:hover {
  transform: scale(1.05);
}

.winner-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 10px 10px 10px 10px;
  object-fit: cover;
  margin-bottom: 15px;
}

.winner-card p {
  color: #141414;
  font-weight: bold;
  margin: 5px 0;
}

.center-button {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.export-button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 35);
  cursor: pointer;
}

.export-button i {
  margin-right: 8px;
}

.export-button:hover {
  background-color: #45a049;
}
</style>

