import { ParamSchema } from 'express-validator';

const email: ParamSchema = {
  normalizeEmail: {
    options: { gmail_remove_dots: true, all_lowercase: true },
  },
  isEmail: {
    errorMessage: 'Please enter a valid email address',
  },
  trim: true,
  escape: true,
};

export { email };
