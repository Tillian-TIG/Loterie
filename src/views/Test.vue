<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <title>Document</title>
  </head>
  <body>
   
    <section class="home">
      <video src="/1.mp4" class="video-slide" autoplay muted loop></video>
      <div class="content">
         <h1>Ose<br><span>EGA YO NA EGA</span></h1>
         <br>
        <form @submit.prevent="handleSubmit">
          <div class="file-upload">
            <input type="file" id="selfile" @change="handleFileUpload" accept=".xls,.xlsx">
            <label for="selfile" class="upload-label">
              <i class="fa-solid fa-upload"></i> Charger le fichier
            </label>
            <span id="custom_text" class="fil">{{ fileName || 'Aucun fichier chargé' }}</span>
          </div>
          <br>
          <div class="loading-spinner" v-if="loading">
            <div class="spinner"></div>
          </div>
          <div v-if="fileData">
            <button @click="goToResults" class="result-button"> <i class="fas fa-list"></i> Voir les résultats</button>
          </div>
        </form>
      </div>
    </section>
  </body>
  </html>
</template>

<script>
import * as XLSX from 'xlsx';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      fileName: '',
      fileData: null,
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['updateFileData']),
    handleFileUpload(event) {
      this.loading = true; // Activer l'indicateur de chargement
      this.fileName = ''; // Réinitialiser le nom du fichier
      this.fileData = null; // Réinitialiser les données du fichier précédent
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          this.fileData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          this.loading = false; // Désactiver l'indicateur de chargement après le chargement du fichier
        };
        reader.readAsArrayBuffer(file);
        this.fileName = file.name;
        this.errorMessage = '';
      } else {
        this.loading = false; // Désactiver l'indicateur de chargement si aucun fichier n'est sélectionné
      }
    },
    goToResults() {
      // Mettre à jour les données dans le store
      this.updateFileData(this.fileData);
      // Naviguer vers Trie.vue
      this.$router.push({ name: 'trie_page' });
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:wight');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins",sans-serif;

}

section{
    padding: 100px 200px;
}

.home{
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* background: #2696E9; */
}

.home:before{
    z-index: 777;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.home .content{
    z-index: 888;
    color: #fff;
    width: 70%;
    margin-top: -5%;
}

.home .content h1{
    font-size: 4em;
    font-weight:bold;
    text-transform: uppercase;
    letter-spacing: 5px;
    line-height: 75px;
    margin-bottom: 40px;
}

.home .content h1 span{
    font-size: 1.2em;
    font-weight: bold;
}

.home .content p{
    margin-bottom: 65px;
}

.home .content a{
    background: #fff;
    padding: 15px 35px;
    color: #2696E9;
    font-size: 1.1em;
    font-weight: 500;
    text-decoration: none;
    border-radius: 2px;
}

.home form{
    margin-top: -5%
}

.menu-btn {
    /* background: url('/menu.png') no-repeat; */
    background-size: 30px;
    background-position: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: 0.3s ease;
}

.home video{
    z-index: 000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

input[type="file"]{
    display: none;
}

label{
    display: inline-block;
    font-weight: bold;
    text-transform: uppercase;
    color:#fff;
    background: #f36f21;
    text-align: center;
    padding: 15px 40px;
    font-size: 13px;
    letter-spacing: 1.5px; 
    user-select: none;
    cursor: pointer;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 35);
    border-radius: 3px;
    /* c0392B */
}

.fil{
    margin-left: 10px;
    font-family: sans-serif;
    color: #f8f8f8; 
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #2696E9;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}
.result-button {
  background-color: #2696E9;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 35);
  text-align: center;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

