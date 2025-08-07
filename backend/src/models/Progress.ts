import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  quizId?: mongoose.Types.ObjectId;
  summaryId?: mongoose.Types.ObjectId;
  type: 'quiz' | 'summary';
  score?: number; // for quizzes
  timeSpent: number; // in seconds
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório']
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  summaryId: {
    type: Schema.Types.ObjectId,
    ref: 'Summary'
  },
  type: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: {
      values: ['quiz', 'summary'],
      message: 'Tipo deve ser quiz ou summary'
    }
  },
  score: {
    type: Number,
    min: [0, 'Pontuação deve ser >= 0'],
    max: [100, 'Pontuação deve ser <= 100']
  },
  timeSpent: {
    type: Number,
    required: [true, 'Tempo gasto é obrigatório'],
    min: [0, 'Tempo gasto deve ser >= 0']
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure either quizId or summaryId is provided
progressSchema.pre('save', function(next) {
  if (this.type === 'quiz' && !this.quizId) {
    return next(new Error('quizId é obrigatório para progresso de quiz'));
  }
  if (this.type === 'summary' && !this.summaryId) {
    return next(new Error('summaryId é obrigatório para progresso de resumo'));
  }
  next();
});

// Indexes for better query performance
progressSchema.index({ userId: 1, date: -1 });
progressSchema.index({ userId: 1, type: 1 });
progressSchema.index({ userId: 1, completed: 1 });

export const Progress = mongoose.model<IProgress>('Progress', progressSchema); 