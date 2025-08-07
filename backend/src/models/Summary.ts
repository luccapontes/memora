import mongoose, { Document, Schema } from 'mongoose';

export interface ISummary extends Document {
  title: string;
  subject: string;
  content: string;
  image?: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const summarySchema = new Schema<ISummary>({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [200, 'Título não pode ter mais de 200 caracteres']
  },
  subject: {
    type: String,
    required: [true, 'Matéria é obrigatória'],
    trim: true,
    enum: {
      values: ['Matemática', 'Português', 'História', 'Geografia', 'Biologia', 'Física', 'Química', 'Inglês'],
      message: 'Matéria deve ser uma das opções válidas'
    }
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    trim: true,
    maxlength: [10000, 'Conteúdo não pode ter mais de 10000 caracteres']
  },
  image: {
    type: String,
    default: null
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        return v.length <= 10;
      },
      message: 'Tags não podem ter mais de 10 itens'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Dificuldade é obrigatória'],
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'Dificuldade deve ser easy, medium ou hard'
    },
    default: 'medium'
  },
  estimatedTime: {
    type: Number,
    required: [true, 'Tempo estimado é obrigatório'],
    min: [1, 'Tempo estimado deve ser pelo menos 1 minuto'],
    max: [120, 'Tempo estimado não pode ser mais de 120 minutos']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
summarySchema.index({ subject: 1, isActive: 1 });
summarySchema.index({ title: 'text', content: 'text' });

export const Summary = mongoose.model<ISummary>('Summary', summarySchema); 