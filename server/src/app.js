import cors from '@fastify/cors'
import Fastify from 'fastify'
import config from './config.js'
import envToLogger from './logger.js'
import motosRoutes from './motos/motos-routes.js'
import authPlugin from './plugins/auth.js'
import mongoosePlugin from './plugins/mongoose.js'
import rootRoutes from './rootRoute.js'
import authRoutes from './users/auth-routes.js'
import usersRoutes from './users/users-routes.js'

async function buildApp() {
  const fastify = Fastify({
    logger: envToLogger[config.env] ?? true,
  })
  await fastify.register(cors, {
    origin: config.appBaseUrl, // 👈 On remplace 'true' par ça
    credentials: true, // 👈 Et on ajoute cette ligne magique pour les cookies !
  })
  await fastify.register(authPlugin)
  await fastify.register(mongoosePlugin)

  // Enregistrement des routes
  fastify.register(authRoutes, { prefix: '/auth' })
  fastify.register(usersRoutes, { prefix: '/users' })
  // 2. On branche les motos sur l'URL /motos
  fastify.register(motosRoutes, { prefix: '/motos' })
  fastify.register(rootRoutes)

  return fastify
}

export default buildApp
