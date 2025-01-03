import {
  calculateFiguresService,
  calculateTotalRevenueService,
  getMonthlyRevenueAndExpenseService,
} from "../services/statisticService.js";

export const getRevenue = async (req, res) => {
  try {
    const totalRevenue = await calculateTotalRevenueService();
    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.log("Lỗi tại controller getRevenue", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getFigures = async (req, res) => {
  try {
    const figures = await calculateFiguresService();
    return res.status(200).json(figures);
  } catch (error) {
    console.log("Lỗi tại controller getFigures", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMonthlyRevenueAndExpense = async (req, res) => {
  try {
    const result = await getMonthlyRevenueAndExpenseService();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getMonthlyRevenue", error);
    return res.status(500).json({ message: error.message });
  }
};
