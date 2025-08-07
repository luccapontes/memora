import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    res.status(400).json({
      message: 'Dados inválidos',
      errors: errors.array()
    });
  };
};

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Erro:', err);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Erro de validação',
      errors: Object.values(err).map((error: any) => error.message)
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      message: 'ID inválido'
    });
    return;
  }

  if (err.name === 'MongoError' && (err as any).code === 11000) {
    res.status(400).json({
      message: 'Dados duplicados'
    });
    return;
  }

  res.status(500).json({
    message: 'Erro interno do servidor'
  });
}; 