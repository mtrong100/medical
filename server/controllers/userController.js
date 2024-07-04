import User from "../models/userModel.js";

export const getUserDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select(
      "-password -resetPasswordOtp -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in send getUserDetail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password -resetPasswordOtp -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error ins updateUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    console.log("Error in send deleteUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserCollection = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "users not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in send getUserCollection controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
