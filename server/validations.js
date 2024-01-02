import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Некорректный email').isEmail(),
  body('password', 'Пороль должен содержать миниму 5 символов').isLength({ min: 5 }),
  body('', 'Неверный логин или пороль').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Некорректный email').isEmail(),
  body('password', 'Пороль должен содержать миниму 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на автарку').optional().isString(),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тегов').optional(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

export const commentCreateValidation = [
  body('text', 'Введите текст комментария').isLength({ min: 1 }).isString(),
  // body('tags', 'Неверный формат тегов (укажите масив)').optional().isArray(),
  // body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
