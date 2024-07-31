import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

export const validateCreateComment = [
  body("user")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid user ID");
      }
      return true;
    })
    .withMessage("User ID is required"),

  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateComment = [
  body("user")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid user ID");
      }
      return true;
    })
    .withMessage("Invalid user ID"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
