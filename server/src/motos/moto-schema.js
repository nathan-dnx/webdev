import mongoose from 'mongoose'

const { Schema } = mongoose

const motoSchema = new Schema({
  // On relie cette moto à l'utilisateur qui l'a créée
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  configName: {
    type: String,
    required: true,
    trim: true,
  },
  baseModel: {
    type: String,
    required: true,
    enum: ['Roadster', 'Sportive', 'Custom', 'Trail'], // Exemples de modèles de base
  },
  color: {
    type: String,
    default: '#000000', // Code couleur hexa par défaut (Noir)
  },
  exhaust: {
    type: String,
    default: 'Standard', // Échappement
  },
  mirrors: {
    type: String,
    default: 'Standard', // Rétroviseurs
  },
}, {
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
})

export default mongoose.model('Moto', motoSchema)
