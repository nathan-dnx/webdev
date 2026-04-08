import User from './user-schema.js'

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
function usersRoutes(app) {
  app.get('/verify-email', async (request, reply) => {
    // Récupérer le token de validation depuis la querystring
    const { token } = request.query

    // Valider la présence du token
    if (!token) {
      return reply.status(400).send({ error: 'Token de validation manquant' })
    }

    // Rechercher l'utilisateur correspondant au token
    const user = await User.findOne({ validationToken: token })

    // Gérer le cas où le token est invalide ou expiré
    if (!user) {
      return reply.status(400).send({ error: 'Token invalide ou utilisateur introuvable' })
    }

    // Vérifier si l'utilisateur a déjà validé son email
    if (user.emailVerified) {
      return reply.status(400).send({ error: 'Cet email est déjà validé' })
    }

    // Marquer l'email comme vérifié et supprimer le token
    user.emailVerified = true
    user.validationToken = null
    // Sauvegarder les modifications dans la base de données
    await user.save()

    return reply.send({ message: 'Email validé avec succès !' })
  })

  app.get('/me', {
    onRequest: [app.authenticate], // Route protégée
  }, async (request, reply) => {
    return reply.send({ user: request.currentUser })
  })

  // Récupérer tous les utilisateurs (Route protégée)
  app.get('/', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    // On récupère les utilisateurs (limité à 50) sans afficher leurs mots de passe
    const users = await User.find().select('-passwordHash').limit(50)
    return reply.send(users)
  })

  // Récupérer un utilisateur par son ID (Route protégée)
  app.get('/:id', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const { id } = request.params

    try {
      const user = await User.findById(id).select('-passwordHash')
      if (!user) {
        return reply.status(404).send({ error: 'Utilisateur introuvable' })
      }
      return reply.send(user)
    } catch {
      return reply.status(400).send({ error: 'Format d\'ID invalide' })
    }
  })

  // Supprimer un utilisateur par son ID (Route protégée)
  app.delete('/:id', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const { id } = request.params

    try {
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        return reply.status(404).send({ error: 'Utilisateur introuvable' })
      }
      return reply.send({ message: 'Utilisateur supprimé avec succès' })
    } catch {
      return reply.status(400).send({ error: 'Format d\'ID invalide' })
    }
  })
}

export default usersRoutes
