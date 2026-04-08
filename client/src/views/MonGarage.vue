<script setup>
import { ref, onMounted } from 'vue'

const motos = ref([])
const loading = ref(true)

// fonction pour récupérer les motos dans la base de données
const fetchMotos = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/motos`, {
      method: 'GET',
      headers: {

        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include',
    })

    if (response.ok) {
      motos.value = await response.json()
    } else {
      console.error("Accès refusé. Tu dois être connecté pour voir le garage.")

    }
  } catch (error) {
    console.error("Erreur de récupération :", error)
  } finally {
    loading.value = false
  }
}


onMounted(fetchMotos)
</script>

<template>
  <div class="garage-page">
    <h2>🏠 Mon Garage Personnalisé</h2>

    <div v-if="loading" class="loading">Ouverture des portes du garage... ⏳</div>

    <div v-else-if="motos.length === 0" class="empty-msg">
      <p>Ton garage est vide ! Va vite dans "Créer une Moto" pour en ajouter une. 🏍️</p>
    </div>

    <div v-else class="motos-grid">
      <div v-for="moto in motos" :key="moto._id" class="moto-card">
        <div class="color-badge" :style="{ backgroundColor: moto.color }"></div>

        <h3>{{ moto.configName }}</h3>
        <p><strong>Modèle :</strong> {{ moto.baseModel }}</p>
        <p><strong>Échappement :</strong> {{ moto.exhaust }}</p>
        <p><strong>Rétroviseurs :</strong> {{ moto.mirrors }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.garage-page {
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}
.motos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.moto-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.color-badge {
  width: 100%;
  height: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}
p {
  margin: 5px 0;
  font-size: 14px;
}
.empty-msg, .loading {
  text-align: center;
  margin-top: 40px;
  font-style: italic;
  color: #7f8c8d;
}
</style>
