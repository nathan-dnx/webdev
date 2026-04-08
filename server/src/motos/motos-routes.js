import Moto from './moto-schema.js'

/**
 * @param {import('fastify').FastifyInstance} app
 */
export default async function motosRoutes(app) {
  // ROUTE POST
  app.post('/', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    try {
      const { configName, baseModel, color, exhaust, mirrors } = request.body

      const userId = request.currentUser._id

      const newMoto = await Moto.create({
        user: userId,
        configName,
        baseModel,
        color,
        exhaust,
        mirrors,
      })

      return reply.status(201).send(newMoto)
    } catch {
      return reply.status(500).send({ error: 'Erreur lors de la création de la moto' })
    }
  })

  // ROUTE GET
  app.get('/', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    try {
      const userId = request.currentUser._id
      const motos = await Moto.find({ user: userId })
      return reply.send(motos)
    } catch {
      return reply.status(500).send({ error: 'Erreur lors de la récupération des motos' })
    }
  })
}
