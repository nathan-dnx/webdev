<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)

// Les 3 variables dont on a besoin
const email = ref('')
const username = ref('')
const password = ref('')
const message = ref('')

const submitAuth = async () => {
  const endpoint = isLogin.value ? 'login' : 'register'

  // On prépare les données à envoyer
  // Si on se connecte : on envoie juste email + mdp
  // Si on s'inscrit : on envoie email + pseudo + mdp
  const payload = isLogin.value
    ? { email: email.value, password: password.value }
    : { email: email.value, username: username.value, password: password.value }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      if (isLogin.value) {
        message.value = '✅ Connexion réussie ! Redirection...'
        if (data.token) localStorage.setItem('token', data.token)
        setTimeout(() => router.push('/garage'), 1000)
      } else {

        message.value = '✅ Compte créé ! Regarde tes emails (connexion directe pour le test, j ai désac la vérification).'

        setTimeout(() => isLogin.value = true, 2000)
      }
    } else {
      message.value = `❌ Erreur : ${data.error || 'Erreur serveur'}`
    }
  } catch  {
    message.value = '❌ Impossible de contacter le serveur.'
  }
}
</script>

<template>
  <div class="auth-page">
    <h2>{{ isLogin ? '🔐 Connexion' : '📝 Créer un compte' }}</h2>

    <form @submit.prevent="submitAuth" class="auth-form">

      <div class="form-group">
        <label>Email :</label>
        <input type="email" v-model="email" required placeholder="pilote@moto.com" />
      </div>

      <div v-if="!isLogin" class="form-group">
        <label>Pseudo :</label>
        <input type="text" v-model="username" required placeholder="DarkRider99" />
      </div>

      <div class="form-group">
        <label>Mot de passe :</label>
        <input type="password" v-model="password" required placeholder="********" />
      </div>

      <button type="submit">{{ isLogin ? 'Se connecter' : "S'inscrire" }}</button>
    </form>

    <p class="toggle-text">
      {{ isLogin ? "Pas encore de compte ?" : "Déjà un compte ?" }}
      <span @click="isLogin = !isLogin" class="toggle-link">
        {{ isLogin ? "S'inscrire ici" : "Se connecter" }}
      </span>
    </p>

    <p v-if="message" class="feedback-msg">{{ message }}</p>
  </div>
</template>

<style scoped>
.auth-page { max-width: 400px; margin: 50px auto; padding: 20px; background: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: sans-serif; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
label { font-weight: bold; margin-bottom: 5px; }
input { padding: 10px; border-radius: 5px; border: 1px solid #ccc; }
button { width: 100%; padding: 10px; background-color: #2c3e50; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
button:hover { background-color: #34495e; }
.toggle-text { text-align: center; margin-top: 15px; font-size: 14px; }
.toggle-link { color: #ff4757; cursor: pointer; font-weight: bold; text-decoration: underline; }
.feedback-msg { text-align: center; margin-top: 15px; font-weight: bold; }
</style>
