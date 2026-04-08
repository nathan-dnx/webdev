<script setup>
import { ref } from 'vue'


const motoForm = ref({
  configName: '',
  baseModel: 'Roadster',
  color: '#000000',
  exhaust: 'Standard',
  mirrors: 'Standard'
})

const message = ref('')


const saveMoto = async () => {
  try {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/motos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(motoForm.value)
    })

    if (response.ok) {
      message.value = '✅ Moto sauvegardée dans le garage !'

      motoForm.value.configName = ''
    } else {
      message.value = '❌ Erreur lors de la sauvegarde.'
    }
  } catch (error) {
    console.error(error)
    message.value = '❌ Impossible de contacter le serveur.'
  }

}
</script>

<template>
  <div class="customisation-page">
    <h2>🏍️ Customise ta moto</h2>

    <form @submit.prevent="saveMoto" class="moto-form">

      <div class="form-group">
        <label>Nom de ta configuration :</label>
        <input type="text" v-model="motoForm.configName" required placeholder="Ex: La Batmoto" />
      </div>

      <div class="form-group">
        <label>Modèle de base :</label>
        <select v-model="motoForm.baseModel">
          <option value="Roadster">Roadster</option>
          <option value="Sportive">Sportive</option>
          <option value="Custom">Custom</option>
          <option value="Trail">Trail</option>
        </select>
      </div>

      <div class="form-group">
        <label>Couleur de la carrosserie :</label>
        <input type="color" v-model="motoForm.color" />
      </div>

      <div class="form-group">
        <label>Échappement :</label>
        <select v-model="motoForm.exhaust">
          <option value="Standard">Standard</option>
          <option value="Carbone">Silencieux Carbone</option>
          <option value="Titane">Ligne complète Titane</option>
        </select>
      </div>

      <div class="form-group">
        <label>Rétroviseurs :</label>
        <select v-model="motoForm.mirrors">
          <option value="Standard">Standard</option>
          <option value="Embout de guidon">Embout de guidon</option>
          <option value="Sport">Sport profilés</option>
        </select>
      </div>

      <button type="submit">Sauvegarder ma moto</button>
    </form>

    <p v-if="message" class="feedback-msg">{{ message }}</p>
  </div>
</template>

<style scoped>

.customisation-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
}
input, select, button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
button {
  background-color: #ff4757;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}
button:hover {
  background-color: #ff6b81;
}
.feedback-msg {
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
}
</style>
