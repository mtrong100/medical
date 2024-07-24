import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryDetail,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/inventories", getInventory);
router.get("/:id", getInventoryDetail);
router.post("/create", createInventory);
router.delete("/delete/:id", deleteInventory);

export default router;
