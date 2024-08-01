import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

export const validateCreatePost = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),

  body("image").isURL().withMessage("Image must be a valid URL"),

  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),

  body("author")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid author ID");
      }
      return true;
    })
    .withMessage("Author ID is required"),

  body("category")
    .isString()
    .withMessage("Category must be a string")
    .notEmpty()
    .withMessage("Category is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdatePost = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("image").optional().isURL().withMessage("Image must be a valid URL"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content cannot be empty"),

  body("author")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid author ID");
      }
      return true;
    })
    .withMessage("Invalid author ID"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .notEmpty()
    .withMessage("Category cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
