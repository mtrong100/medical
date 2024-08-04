import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryDetail,
  updateInventory,
} from "../controllers/inventoryController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { validateInventory } from "../validation/inventoryValidate.js";

const router = express.Router();

router.get("/", verifyAdmin, getInventory);

router.get("/:id", verifyAdmin, getInventoryDetail);

router.post("/create", verifyAdmin, validateInventory, createInventory);

router.put("/update/:id", verifyAdmin, updateInventory);

router.delete("/delete/:id", verifyAdmin, deleteInventory);

export default router;
