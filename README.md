# 🏍️ MotoCustom - Gestionnaire de Garage

MotoCustom est une application web Full-Stack permettant aux passionnés de motos de créer un compte sécurisé et de gérer leur propre garage virtuel en personnalisant leurs véhicules.

🌍 **Voir le site en ligne :** [https://splendid-crisp-4926b3.netlify.app]

---

## ✨ Fonctionnalités

* **Système d'authentification complet :** Inscription et connexion sécurisées avec hachage des mots de passe.
* **Sécurité :** Gestion des sessions via des cookies `HttpOnly` sécurisés (JWT).
* **Gestion du Garage :** Création, lecture et affichage des motos enregistrées en base de données.
* **Architecture Full-Stack :** Séparation claire entre le client (Vue.js) et l'API serveur (Fastify).

---

## 🛠️ Technologies Utilisées

**Frontend (Client) :**
* [Vue.js 3](https://vuejs.org/) (Composition API)
* Vite (Bundler)
* Vue Router (Navigation)
* Hébergé sur **Netlify**

**Backend (Serveur) :**
* [Node.js](https://nodejs.org/)
* [Fastify](https://fastify.dev/) (Framework web ultra-rapide)
* Mongoose (ODM pour la base de données)
* JWT (JSON Web Tokens pour l'authentification)
* Hébergé sur **Render**

**Base de Données :**
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud NoSQL)

---

## 🚀 Installation Globale (Local)

Si vous souhaitez faire tourner ce projet sur votre propre machine, suivez ces instructions :

### Prérequis
* Node.js installé sur votre machine.
* Un compte MongoDB Atlas (ou une base de données locale).

### 1. Cloner le projet
```bash
git clone [https://github.com/nathan-dnx/webdev.git](https://github.com/nathan-dnx/webdev.git)
cd webdev
```

### 2. Configuration du Backend (Serveur)
Ouvrez un terminal dans le dossier `server` :

```bash
cd server
npm install
```
Créez un fichier `.env.development.local` à la racine du dossier `server` et ajoutez vos variables :
```env
PORT=3000
MONGODB_URI=mongodb+srv://<votre_user>:<votre_mdp>@cluster...
JWT_SECRET=votre_phrase_secrete_tres_longue
JWT_COOKIE_NAME=token
APP_BASE_URL=http://localhost:5173
```
Lancez le serveur :
```bash
npm run dev
```

### 3. Configuration du Frontend (Client)
Ouvrez un **nouveau** terminal dans le dossier `client` :

```bash
cd client
npm install
```
Créez un fichier `.env` à la racine du dossier `client` et ajoutez :
```env
VITE_API_URL=http://localhost:3000
```
Lancez l'interface web :
```bash
npm run dev
```

---

## ☁️ Déploiement

Ce projet est configuré pour un déploiement continu gratuit :
* Le dossier `server` est déployé en tant que Web Service sur **Render**. *(Note : le serveur gratuit peut mettre ~50 secondes à se réveiller après une période d'inactivité).*
* Le dossier `client` est déployé en tant que site statique sur **Netlify**.

---

## 👨‍💻 Auteur

Créé par **Nathan** dans le cadre d'un projet de développement web.
