import { body, param, validationResult } from "express-validator";

export const validateSendMessage = [
  body("message")
    .isString()
    .withMessage("Message must be a string")
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Message must be between 1 and 2000 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
