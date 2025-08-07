import mongoose, { Document, Schema } from 'mongoose';

export interface IQuiz extends Document {
  question: string;
  alternatives: string[];
  correct: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>({
  question: {
    type: String,
    required: [true, 'Pergunta é obrigatória'],
    trim: true,
    maxlength: [500, 'Pergunta não pode ter mais de 500 caracteres']
  },
  alternatives: {
    type: [String],
    required: [true, 'Alternativas são obrigatórias'],
    validate: {
      validator: function(v: string[]) {
        return v.length >= 2 && v.length <= 5;
      },
      message: 'Quiz deve ter entre 2 e 5 alternativas'
    }
  },
  correct: {
    type: Number,
    required: [true, 'Resposta correta é obrigatória'],
    min: [0, 'Índice da resposta correta deve ser >= 0'],
    validate: {
      validator: function(this: IQuiz, v: number) {
        return v >= 0 && v < this.alternatives.length;
      },
      message: 'Índice da resposta correta deve ser válido'
    }
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
  difficulty: {
    type: String,
    required: [true, 'Dificuldade é obrigatória'],
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'Dificuldade deve ser easy, medium ou hard'
    },
    default: 'medium'
  },
  explanation: {
    type: String,
    trim: true,
    maxlength: [1000, 'Explicação não pode ter mais de 1000 caracteres']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema); 