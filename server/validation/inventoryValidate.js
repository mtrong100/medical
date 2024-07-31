import { body, validationResult } from "express-validator";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const validateInventory = [
  body("supplier")
    .exists()
    .withMessage("Supplier is required")
    .isMongoId()
    .withMessage("Invalid Supplier ID"),
  body("total")
    .exists()
    .withMessage("Total is required")
    .isNumeric()
    .withMessage("Total must be a number"),
  body("itemType")
    .exists()
    .withMessage("Item Type is required")
    .isIn(["Medicine", "Device"])
    .withMessage("Invalid Item Type"),
  body("items")
    .exists()
    .withMessage("Items are required")
    .isArray({ min: 1 })
    .withMessage("Items must be an array with at least one item"),
  body("items.*.medicine")
    .if((value, { req }) => req.body.itemType === "Medicine")
    .exists()
    .withMessage("Medicine ID is required for medicine items")
    .isMongoId()
    .withMessage("Invalid Medicine ID"),
  body("items.*.device")
    .if((value, { req }) => req.body.itemType === "Device")
    .exists()
    .withMessage("Device ID is required for device items")
    .isMongoId()
    .withMessage("Invalid Device ID"),
  body("items.*.quantity")
    .exists()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
