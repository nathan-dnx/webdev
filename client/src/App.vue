<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <h1>🏍️ MotoCustom</h1>
    <nav>
        <RouterLink to="/garage">Mon Garage</RouterLink>
        <RouterLink to="/customisation">Créer une Moto</RouterLink>
        <RouterLink to="/login">Connexion</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Un peu de style pour avoir un beau menu de navigation */
header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #34495e;
}

/* Vue Router ajoute automatiquement cette classe au lien de la page actuelle */
nav a.router-link-exact-active {
  background-color: #ff4757;
}

main {
  padding: 2rem;
}
</style>
