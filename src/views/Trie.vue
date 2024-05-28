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
            <td>Liste des {{ group.label }}</td>
            <td class="center-button"><button @click="downloadFile(group)" class="download-button"><i class="fa fa-trophy"></i> Gagnants</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import * as XLSX from 'xlsx';
import { mapGetters } from 'vuex';

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
        { label: 'Gagnants à 1500 points', minPoints: 1500, maxPoints: 2000 },
        { label: 'Gagnants à 2000 points', minPoints: 2000, maxPoints: 3000 },
        { label: 'Gagnants à 3000 points', minPoints: 3000, maxPoints: 5000 },
        { label: 'Gagnants à 5000 points', minPoints: 5000, maxPoints: Infinity },
      ]
    };
  },
  methods: {
    filteredData(group) {
      return this.fileData.filter(row => {
        const points = row[1];
        return points >= group.minPoints && points < group.maxPoints;
      });
    },
    downloadFile(group) {
      const data = this.filteredData(group);
      const ws = XLSX.utils.aoa_to_sheet([['MSISDN', 'POINTS', 'FIRSTNAME', 'LASTNAME', 'PROFILE', 'DATE_SUBSCRIPTION'], ...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const fileName = `Liste des gagnants du ${group.label}.xlsx`;
      XLSX.writeFile(wb, fileName);
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
</style>
