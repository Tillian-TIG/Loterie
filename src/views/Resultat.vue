<template>
  <section class="home">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <video src="/1.mp4" class="video-slide" autoplay muted loop></video>
    <div class="content">
      <div v-if="winners.length === 0">
        <p>Aucun résultat à afficher. Veuillez tirer au sort depuis la page précédente.</p>
      </div>
      
      <div v-else class="results-container">
        <div v-for="(winner, index) in winners" :key="index" class="winner-card">
          <i class="fa fa-user winner-icon"></i>
          <p>IDENTITE : {{ winner[2] }} {{ winner[3] }}</p>
          <p>Numéro : {{ winner[0] }}</p> 
          <p>Points : {{winner[1]}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getRandomWinners']),
    winners() {
      return this.getRandomWinners;
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

.winner-card {
  background-color: rgba(255, 255, 255, 0.945);
  border-radius: 15px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.winner-card:hover {
  transform: scale(1.05);
}

.winner-icon {
  font-size: 50px;
  color: gold;
  margin-bottom: 10px;
}

.winner-card p {
  color: #141414;
  font-weight: bold;
  margin: 5px 0;
}
</style>
